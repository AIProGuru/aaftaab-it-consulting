# Aaftaab Inc. Consulting Website

A simple static consulting website for a software development company.

## Files

- `index.html` - page structure and content
- `styles.css` - responsive visual design
- `script.js` - mobile navigation, current year, and contact form handling
- `functions/api/contact.js` - Cloudflare Pages Function for consultation form email
- `assets/portfolio-hero.svg` - hero visual asset

## Local Preview

Open `index.html` in a browser, or run a local static server:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy

This site can be deployed on any static host, including GitHub Pages, Netlify, Vercel, Cloudflare Pages, or Firebase Hosting.

## Cloudflare contact form setup

The contact form posts to `/api/contact`, which is handled by the Cloudflare Pages Function in `functions/api/contact.js`.

To enable direct email sending on Cloudflare:

1. Make sure the site is deployed from Git or Wrangler, not dashboard drag-and-drop upload. Dashboard drag-and-drop uploads do not compile a `functions` folder.
2. In Cloudflare, add and verify `contact@aaftaab.com` as an Email Routing destination address.
3. In Email Service, onboard the `aaftaab.com` domain for Email Sending.
4. Create a Cloudflare API token with permission to send email.
5. Add these Pages environment variables:
   - `CLOUDFLARE_ACCOUNT_ID`
   - `CLOUDFLARE_API_TOKEN`
   - `CONTACT_TO_EMAIL=contact@aaftaab.com`
   - `CONTACT_FROM_EMAIL=contact@aaftaab.com`

If the backend is not configured yet, the browser script falls back to opening a prefilled email to `contact@aaftaab.com`.