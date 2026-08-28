/**
 * Client-side lead capture. Posts straight to a Google Apps Script Web App
 * (see scripts/google-apps-script/) that appends a row to the relevant
 * Sheet — no server of our own involved.
 *
 * Fire-and-forget by design: the customer has already been handed off to
 * WhatsApp/email by the time this is called, so a failed log here should
 * never block or error out the UI. Callers should still `.catch()` this,
 * same as before, in case a future caller wants to know.
 */

const LEADS_ENDPOINT = import.meta.env.VITE_LEADS_ENDPOINT;
const LEADS_SECRET = import.meta.env.VITE_LEADS_SECRET;

type LeadTarget = "form" | "chat";

type FormLeadInput = {
  name: string;
  phone: string;
  car: string;
  service: string;
  message: string;
  channel: "whatsapp" | "email";
};

type ChatLeadInput = {
  name: string;
  phone: string;
  car: string;
  service: string;
  condition: string;
  transcript: string;
};

async function postLead(target: LeadTarget, data: FormLeadInput | ChatLeadInput): Promise<void> {
  if (!LEADS_ENDPOINT) {
    console.warn("VITE_LEADS_ENDPOINT is not configured — lead was not logged.");
    return;
  }

  // Content-Type: text/plain keeps this a CORS "simple request" — Apps
  // Script Web Apps don't implement an OPTIONS handler, so a JSON
  // content-type here would trigger a preflight that just fails.
  await fetch(LEADS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ target, secret: LEADS_SECRET, ...data }),
  });
}

export function submitFormLead(data: FormLeadInput): Promise<void> {
  return postLead("form", data);
}

export function submitChatLead(data: ChatLeadInput): Promise<void> {
  return postLead("chat", data);
}
