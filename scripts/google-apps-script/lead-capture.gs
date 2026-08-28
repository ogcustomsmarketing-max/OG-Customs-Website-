/**
 * OG Customs — lead capture backend.
 *
 * Deploy: open either target Sheet → Extensions → Apps Script → paste this
 * file's contents → Deploy → New deployment → type "Web app" →
 * execute as "Me", access "Anyone" → Deploy → copy the Web App URL.
 *
 * Set LEADS_SECRET below to a random string, then put the SAME string in the
 * site's VITE_LEADS_SECRET env var. This is a basic bot filter, not real
 * auth — anyone with devtools can still see it in the client bundle. It just
 * stops naive scanners from spamming the endpoint.
 */

const LEADS_SECRET = "REPLACE_WITH_A_RANDOM_STRING";

const SHEET_IDS = {
  form: "1bQKmT2twrm9mybFHR_GvlyuQJzJ0gNlSdvQlZQZiwIs",
  chat: "1dh7FIlrLaOJr2b-rlTfNRCFRAUs9FqJRfTJXne1zQpg",
};

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (LEADS_SECRET && data.secret !== LEADS_SECRET) {
      return jsonResponse({ ok: false, error: "unauthorized" });
    }

    const sheetId = SHEET_IDS[data.target];
    if (!sheetId) {
      return jsonResponse({ ok: false, error: "invalid target" });
    }

    const sheet = SpreadsheetApp.openById(sheetId).getSheets()[0];
    sheet.appendRow(buildRow(data.target, data));

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function buildRow(target, data) {
  const now = Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss");
  const clip = (value, max) => String(value || "").slice(0, max);

  if (target === "form") {
    return [
      now,
      clip(data.name, 80),
      clip(data.phone, 20),
      clip(data.car, 80),
      clip(data.service, 80),
      clip(data.message, 500),
      data.channel === "whatsapp" ? "Website form → WhatsApp" : "Website form → Email",
    ];
  }

  // "chat"
  return [
    now,
    clip(data.name, 80),
    clip(data.phone, 20),
    clip(data.car, 80),
    clip(data.service, 80),
    clip(data.condition, 80),
    clip(data.transcript, 4000),
  ];
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
