# Google Apps Script — lead capture backend

This is OG Customs' entire "backend." No server, no hosting, no secrets —
Google runs it for free.

## Deploy (one-time, ~5 minutes)

1. Open the Google Sheet for either the booking form (`1bQKmT2twrm9mybFHR_GvlyuQJzJ0gNlSdvQlZQZiwIs`)
   or the chat assistant (`1dh7FIlrLaOJr2b-rlTfNRCFRAUs9FqJRfTJXne1zQpg`) — same script handles both.
2. **Extensions → Apps Script**.
3. Delete the placeholder `Code.gs` content and paste in `lead-capture.gs` from this folder.
4. Edit the `LEADS_SECRET` constant at the top — replace with any random string
   (e.g. mash the keyboard, or run `openssl rand -hex 16` locally).
5. **Deploy → New deployment**:
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Click **Deploy**, authorize the permissions prompt (it needs to write to
   your Sheets), then copy the **Web app URL** it gives you
   (looks like `https://script.google.com/macros/s/AKfycb.../exec`).

## Wire it into the site

Set these in your `.env` (local) and in your GitHub Actions/Pages deployment
environment:

```
VITE_LEADS_ENDPOINT=https://script.google.com/macros/s/AKfycb.../exec
VITE_LEADS_SECRET=<the same random string you put in LEADS_SECRET>
```

## Re-deploying after edits

Apps Script Web App URLs stay stable across re-deploys *if* you use
**Deploy → Manage deployments → Edit (pencil) → New version** instead of
creating a brand new deployment. Creating a new deployment gives you a new
URL and you'd need to update `VITE_LEADS_ENDPOINT` again.

## Notes

- `LEADS_SECRET` is a basic bot filter, not real security — anyone who opens
  devtools can read it from the built JS bundle. It just stops naive spam
  scanners from finding the endpoint and hammering it blind.
- If a write fails, the script returns `{ ok: false, error: "..." }`, but the
  site treats every lead submission as fire-and-forget (the customer's
  already been sent to WhatsApp/email regardless — see `leads.ts`).
