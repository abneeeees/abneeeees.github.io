[ [**VISIT HERE**](https://abneeeees.is-a.dev) ]

---

<img width="1876" height="1126" alt="image" src="https://github.com/user-attachments/assets/6a5a8f8c-2a19-4725-9407-c019776e8427" />

Personal portfolio of **Avneesh Kumar** (`abneeeees`) — built with [Astro](https://astro.build).

## Stack

- **Astro** (static output, zero client framework)
- Vanilla CSS (global stylesheet) + vanilla JS for the theme toggle, art carousel, UPI copy and the star-field background
- Font Awesome + Google Fonts via CDN
- `@astrojs/sitemap` for `sitemap-index.xml`
- **Bun** as the package manager

## Project structure

```text
public/            # static assets served as-is (assets, CNAME, robots.txt)
src/
  components/      # Hero, About, Projects, Art, Contact, SiteFooter, ...
  data/            # projects, artworks, socials (edit content here)
  layouts/         # BaseLayout (head, SEO, scripts)
  pages/           # index.astro, 404.astro
  scripts/         # main.js (theme/carousel/upi), background.js (canvas)
  styles/          # global.css
```

## To Run Locally

```sh
bun install
bun run dev      # http://localhost:4321
```

## Build

```sh
bun run build    # outputs to dist/
bun run preview  # preview the production build
bun run check    # type-check Astro/TS files
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site
and publishes `dist/` to GitHub Pages. The custom domain is set via `public/CNAME`.
