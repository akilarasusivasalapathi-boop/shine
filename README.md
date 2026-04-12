# SHINE Website

Static marketing website for SHINE, built in the same simple root-file format as the Loramind reference site and ready to deploy on Google Cloud Run.

## Structure

- `index.html` - page markup and SEO metadata
- `style.css` - desktop and shared styles
- `mobile.css` - responsive overrides
- `script.js` - menu, reveal animation, and async form submission
- `assets/` - local SVG brand and preview assets
- `server.js` - static file server plus `/api/contact`
- `Dockerfile` - Cloud Run container image

## Local Run

```bash
node server.js
```

Open `http://localhost:8080`.

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
