# Loopay support website

Public support and privacy pages for Loopay, built with React.

## Local preview

Use Node.js 22.13 or newer. Run `npm ci`, then `npm run dev`.

## GitHub Pages

Run `npm run build:pages` to generate static HTML and CSS in `out/`.
Upload the generated files to the `gh-pages` branch to publish updates.
In repository Settings > Pages, select **Deploy from a branch**, then **gh-pages / (root)**.

The project URL uses `/loopay-support/`. Update `scripts/build-pages.mjs`
and image paths in the page components if the repository name changes.

Only the public website belongs in this repository. Mobile app credentials,
backend secrets, and local hosting registration are excluded.

