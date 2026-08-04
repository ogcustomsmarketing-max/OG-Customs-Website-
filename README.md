# OG Customs — Bangalore car & bike detailing landing page

Built with TanStack Start (React 19 + Vite 7 + Tailwind v4). Leads from the
booking form and the chat assistant are appended to two Google Sheets from the
server, using a Google service account.

## Local development

```bash
npm install
cp .env.example .env   # fill in the service-account values
npm run dev            # http://localhost:8080
```

## Deploying to Netlify

1. Push this repo to GitHub.
2. In Netlify: **Add new site → Import an existing project → GitHub** and pick
   the repo.
3. Netlify reads `netlify.toml`, so leave the build settings as detected:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - The server runs as a Netlify Function (Nitro `netlify` preset, set via the
     `NITRO_PRESET` env var in `netlify.toml`).
4. Add the environment variables under **Site configuration → Environment
   variables** (scope: all deploy contexts):
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` (full PEM, `\n` escapes are handled)
5. Deploy. Submit the form once and confirm a row lands in the sheet.

### Google Sheets setup (one-time)

- Google Cloud Console → enable the **Google Sheets API** for the project that
  owns the service account.
- Share both spreadsheets with the service-account email as **Editor**:
  - Submission form: `1bQKmT2twrm9mybFHR_GvlyuQJzJ0gNlSdvQlZQZiwIs`
  - Chat assistant: `1dh7FIlrLaOJr2b-rlTfNRCFRAUs9FqJRfTJXne1zQpg`

Sheet IDs live in `src/lib/leads.server.ts`.

### Notes

- No Lovable-only services are required at runtime. If the optional
  `LOVABLE_API_KEY` / `GOOGLE_SHEETS_API_KEY` variables are absent, the code
  simply uses the service account (the connector path is skipped).
- If a write ever fails, the lead row is logged in the Netlify function logs so
  nothing is lost.
- Custom domain: **Netlify → Domain management → Add a domain**, then update
  `BASE_URL` in `src/routes/sitemap[.]xml.ts` and the canonical/OG URLs in
  `src/routes/index.tsx`.
