# HIKARI Study Abroad Consultancy website

A responsive, dependency-free, multi-page Node.js website. It uses server-rendered HTML and a small amount of browser JavaScript for the mobile menu. It has no inquiry form, analytics, document upload, external imagery, or database.

## Run locally

From this folder, run:

```powershell
node server.js
```

Then open <http://localhost:4173>. `PORT` can change the local port. `SITE_ORIGIN` should be set to the final HTTPS site origin before deployment so canonical, social, robots and sitemap URLs use the real domain. Do not deploy until the owner-review items in `docs/owner-review-checklist.md` are resolved.

For a static host, run `node build-static.js`. This writes publishable HTML route folders and shared assets to `site-build/`; relative canonical URLs keep the output valid before the host assigns its URL.

## Pages

The home, Itahari consultancy, Japan, Australia, USA, destinations and services, about, and FAQ pages are indexable. The application and visa guidance page is a noindex draft until its service is confirmed. Contact, office location and policy pages are noindex drafts while their supplied details and business practices await owner review.

The site intentionally does not create a phone link, working inquiry form, map embed, or structured data before the relevant business information is verified.
