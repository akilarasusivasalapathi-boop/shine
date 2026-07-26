# SHINE Website

Multi-page marketing website for **Shine Testing Services India (OPC) Pvt Ltd**,
ready to deploy on Google Cloud Run or any static host.

## Structure

Pages are **generated** from `src/` into HTML at the repo root. Edit the sources,
not the generated `.html` files — a rebuild overwrites them.

- `src/site.js` — company details, navigation, service and industry data (single source of truth)
- `src/layout.js` — page shell: `<head>`, header/nav, footer, structured data
- `src/components.js` — reusable blocks (service cards, CTA band, contact form, icons)
- `src/pages.js` — per-page content
- `build.js` — renders every page plus `sitemap.xml` and `robots.txt`
- `style.css` — the full design system (tokens, components, responsive)
- `script.js` — nav drawer, dropdowns, accordions, scroll reveal, async form
- `assets/img/` — site photography
- `brochure/` — brochure source (`brochure.html` + `build-pdf.sh`) which renders `assets/shine-india-brochure.pdf`
- `server.js` — static file server, clean URLs, 404 page, and `/api/contact`
- `Dockerfile` — Cloud Run container image

Generated at the repo root: `index.html`, `about.html`, `services.html`,
`services/*.html` (6), `industries.html`, `resources.html`, `why-shine.html`,
`contact.html`, `404.html`, `sitemap.xml`, `robots.txt`.

## Local Run

```bash
npm run build    # regenerate HTML from src/
npm run serve    # serve on http://localhost:8080
npm start        # build, then serve
```

Both `/about` and `/about.html` resolve, so the site works behind `server.js`
and on a plain static host.

## Adding or Editing a Service

Add an entry to the `services` array in `src/site.js` and run `npm run build`.
The nav dropdown, services hub, footer, homepage grid, sitemap, and a full
detail page with FAQ schema are all generated from it.

## Brochure

```bash
cd brochure && ./build-pdf.sh
```

Renders the 4-page A4 landscape PDF to `assets/shine-india-brochure.pdf` using
headless Chrome. Override the browser path with `CHROME=/path/to/chrome`.

## Environment Variables

- `PORT` - server port, defaults to `8080`
- `SITE_URL` - public website URL used for sitemap and robots output
- `CONTACT_WEBHOOK_URL` - required to make the contact form deliver enquiries
- `CONTACT_WEBHOOK_TOKEN` - optional bearer token sent to the webhook

## Contact Form

The website posts enquiries to `/api/contact`. The server validates the submission and forwards it to `CONTACT_WEBHOOK_URL` as JSON.

Example payload:

```json
{
  "name": "A Buyer",
  "company": "Global Apparel Co",
  "email": "buyer@example.com",
  "service": "Chemical Safety",
  "message": "Need REACH and CPSIA testing for a new program.",
  "source": "website",
  "receivedAt": "2026-04-12T12:00:00.000Z"
}
```

## Cloud Run Deploy

Build and deploy:

```bash
gcloud builds submit --tag REGION-docker.pkg.dev/PROJECT_ID/REPOSITORY/shine-website
gcloud run deploy shine-website \
  --image REGION-docker.pkg.dev/PROJECT_ID/REPOSITORY/shine-website \
  --platform managed \
  --region REGION \
  --allow-unauthenticated \
  --set-env-vars SITE_URL=https://YOUR_DOMAIN,CONTACT_WEBHOOK_URL=https://YOUR_WEBHOOK_ENDPOINT
```

If you later attach a custom domain, update `SITE_URL` to match the live URL.
