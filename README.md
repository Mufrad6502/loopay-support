# Loopay support website

Public support and privacy pages for Loopay, built with React.

## Local preview

Use Node.js 22.13 or newer. Run `npm ci`, then `npm run dev`.

## GitHub Pages

Run `npm run build:pages` to generate static HTML and CSS in `out/`.
The workflow publishes this directory after a push to `main`.
In repository Settings > Pages, select **GitHub Actions** as the source.

The project URL uses `/loopay-support/`. Update `scripts/build-pages.mjs`
and image paths in the page components if the repository name changes.

Only the public website belongs in this repository. Mobile app credentials,
backend secrets, and local hosting registration are excluded.
