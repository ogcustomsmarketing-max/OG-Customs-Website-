# OG Customs — Bangalore car & bike detailing landing page

Built with TanStack Start (React 19 + Vite + Tailwind v4). Ships as a fully
static site — there's no server or hosting bill to manage.

Leads from the booking form and the chat assistant are logged to two Google
Sheets by posting straight from the browser to a Google Apps Script Web App
(see `scripts/google-apps-script/`). No backend, no service-account secrets.

## Local development

```bash
bun install
cp .env.example .env   # fill in the Apps Script URL + shared secret
bun run dev            # http://localhost:8080
```

## Deploying to GitHub Pages

Push to `main` and `.github/workflows/deploy.yml` handles the rest:

1. Builds with `NITRO_PRESET=github_pages`, which makes Nitro prerender
   every route to plain static HTML/CSS/JS in `.output/public`.
2. Uploads that folder as a Pages artifact and deploys it.

One-time setup in the GitHub repo:

- **Settings → Pages → Build and deployment → Source: GitHub Actions.**
- **Settings → Secrets and variables → Actions**, add:
  - `VITE_LEADS_ENDPOINT` — the Apps Script Web App URL
  - `VITE_LEADS_SECRET` — the shared secret from the script

Site ends up at `https://<org>.github.io/<repo>/` unless you attach a custom
domain (Settings → Pages → Custom domain). If you do, update the two URLs in
`public/sitemap.xml` and `public/robots.txt`, and the `og:url`/canonical tags
in `src/routes/__root.tsx`.

### Google Sheets setup (one-time)

See `scripts/google-apps-script/README.md` for the full deploy steps. Short
version: paste `lead-capture.gs` into Extensions → Apps Script on either
sheet, deploy as a Web App, copy the URL into `VITE_LEADS_ENDPOINT`.

Sheet IDs live in `scripts/google-apps-script/lead-capture.gs`:

- Submission form: `1bQKmT2twrm9mybFHR_GvlyuQJzJ0gNlSdvQlZQZiwIs`
- Chat assistant: `1dh7FIlrLaOJr2b-rlTfNRCFRAUs9FqJRfTJXne1zQpg`

### Notes

- Both the booking form and the chat assistant treat lead logging as
  fire-and-forget (`src/lib/leads.ts`) — the customer is already sent
  to WhatsApp/email synchronously on submit, so a failed Sheets write never
  blocks or errors out their experience.
- `VITE_LEADS_SECRET` is a basic bot filter, not real auth (it ships in the
  client bundle by nature of being a static site). It just stops naive
  scanners from hammering the endpoint.
