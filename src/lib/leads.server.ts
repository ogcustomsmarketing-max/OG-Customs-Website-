const SHEETS_API = "https://sheets.googleapis.com/v4";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SCOPE = "https://www.googleapis.com/auth/spreadsheets";

export const SHEET_IDS = {
  form: "1bQKmT2twrm9mybFHR_GvlyuQJzJ0gNlSdvQlZQZiwIs",
  chat: "1dh7FIlrLaOJr2b-rlTfNRCFRAUs9FqJRfTJXne1zQpg",
} as const;

export type LeadTarget = keyof typeof SHEET_IDS;

/* ---------------------------------------------------------------- helpers */

function b64url(input: ArrayBuffer | Uint8Array | string): string {
  let bytes: Uint8Array;
  if (typeof input === "string") {
    bytes = new TextEncoder().encode(input);
  } else if (input instanceof Uint8Array) {
    bytes = input;
  } else {
    bytes = new Uint8Array(input);
  }
  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function pemToPkcs8(pem: string): ArrayBuffer {
  const body = pem
    .replace(/\\n/g, "\n")
    .replace(/-----BEGIN [^-]+-----/, "")
    .replace(/-----END [^-]+-----/, "")
    .replace(/\s+/g, "");
  const binary = atob(body);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

function credentials() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  if (!clientEmail || !privateKey) {
    throw new Error(
      "Google service account credentials are not configured (GOOGLE_SERVICE_ACCOUNT_EMAIL / GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY).",
    );
  }
  return { clientEmail, privateKey };
}

/* ------------------------------------------------------------ access token */

let cachedToken: { value: string; expiresAt: number } | undefined;

async function getAccessToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  if (cachedToken && cachedToken.expiresAt - 300 > now) return cachedToken.value;

  const { clientEmail, privateKey } = credentials();

  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = b64url(
    JSON.stringify({
      iss: clientEmail,
      scope: SCOPE,
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    }),
  );
  const signingInput = `${header}.${claims}`;

  const key = await crypto.subtle.importKey(
    "pkcs8",
    pemToPkcs8(privateKey),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(signingInput),
  );

  const assertion = `${signingInput}.${b64url(signature)}`;

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Google token exchange failed [${response.status}]: ${errorBody}`);
  }

  const payload = (await response.json()) as { access_token: string; expires_in: number };
  cachedToken = {
    value: payload.access_token,
    expiresAt: now + (payload.expires_in ?? 3600),
  };
  return cachedToken.value;
}

/* ----------------------------------------------------------------- append */

async function appendOnce(target: LeadTarget, row: string[]): Promise<void> {
  const token = await getAccessToken();

  const url =
    `${SHEETS_API}/spreadsheets/${SHEET_IDS[target]}/values/A1:append` +
    `?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values: [row] }),
  });

  if (!response.ok) {
    // A 401 usually means the cached token went stale — drop it so the retry re-mints.
    if (response.status === 401) cachedToken = undefined;
    const errorBody = await response.text();
    throw new Error(`Sheets append failed [${response.status}]: ${errorBody}`);
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Optional fallback: append through the Lovable Google Sheets connector gateway.
 * Only used when those credentials happen to exist (i.e. on Lovable hosting);
 * on Netlify or any other host the service-account path above is the only one.
 */
async function appendViaConnector(target: LeadTarget, row: string[]): Promise<void> {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const connectionKey = process.env.GOOGLE_SHEETS_API_KEY;
  if (!lovableKey || !connectionKey) {
    throw new Error("Google Sheets connector credentials are not configured.");
  }


  const url =
    `https://connector-gateway.lovable.dev/google_sheets/v4/spreadsheets/${SHEET_IDS[target]}` +
    `/values/A1:G1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": connectionKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values: [row] }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Connector append failed [${response.status}]: ${errorBody}`);
  }
}

/**
 * Appends one row to the first tab of the target spreadsheet using OG Customs'
 * own Google service account, falling back to the Google Sheets connector when
 * the service account path is unavailable. On total failure the row is logged
 * server-side so no lead is silently lost.
 */
export async function appendRow(target: LeadTarget, row: string[]) {
  const delays = [0, 600, 1800];
  let lastError: unknown;

  for (const delay of delays) {
    if (delay) await sleep(delay);
    try {
      await appendOnce(target, row);
      return;
    } catch (error) {
      lastError = error;
      console.error(`Sheets append attempt failed (${target}):`, error);
    }
  }

  try {
    await appendViaConnector(target, row);
    console.warn(`Sheets append fell back to connector (${target}).`);
    return;
  } catch (error) {
    lastError = error;
    console.error(`Connector fallback failed (${target}):`, error);
  }

  console.error(
    `LEAD NOT SAVED (${target}) — capture manually: ${JSON.stringify(row)}`,
    lastError,
  );
  throw lastError instanceof Error ? lastError : new Error("Sheets append failed");
}


export function nowIST() {
  return new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
}
