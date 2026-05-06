# CLAUDE.md — Project Context for AI Assistants

## What this project is

Personal academic website for **Dejan Zafirev**, PhD Student and Research Assistant in Financial Economics at the University of Liechtenstein. Deployed at **https://dejanzafirev.github.io** via GitHub Pages.

Built on the [Academic Pages](https://github.com/academicpages/academicpages.github.io) Jekyll theme (a fork of Minimal Mistakes). The repo is **dejanzafirev/dejanzafirev.github.io** on GitHub; the local branch is `master` and that is also the deployment branch.

---

## Tech stack

| Layer | Detail |
|---|---|
| Static site generator | Jekyll (built by GitHub Pages automatically on push) |
| Theme | Academic Pages (Minimal Mistakes fork) — `_sass/`, `_layouts/`, `_includes/` |
| Active theme variant | `contrast` (set in `_config.yml` → `site_theme`) |
| CSS customisation | `assets/css/custom.css` — the only file to touch for visual changes |
| JavaScript | `assets/js/_main.js` is the source; bundled into `assets/js/main.min.js` via `npm run uglify` |
| JS bundle | jQuery + fitvids + jquery-smooth-scroll + greedy-nav + `_main.js` |
| Node | `package.json` present; run `npm install` then `npm run uglify` after any JS change |

---

## Repository layout (key files only)

```
_config.yml              # Site-wide settings: title, author, social, theme, analytics
_data/navigation.yml     # Header nav links (Home, Research, CV, Contact)
_pages/                  # All site pages as Markdown (about.md, cv.md, teaching.md, …)
_includes/
  masthead.html          # Custom nav bar — modified for hamburger mobile menu
  seo.html               # JSON-LD structured data + Open Graph meta tags — modified for SEO fixes
  scripts.html           # Loads main.min.js as type="module"
  author-profile.html    # Left sidebar author card
assets/
  css/custom.css         # ALL custom CSS lives here — do not edit theme SCSS directly
  js/_main.js            # JS source (jQuery-based; uses $ throughout)
  js/main.min.js         # Built output — always rebuild after editing _main.js
  js/plotly.min.js       # Plotly standalone file — lazy-loaded only when charts exist
  js/theme.js            # Plotly theme config (dark/light) — ES module, not bundled
```

---

## How to rebuild JS after any change to `_main.js`

```powershell
npm install        # only needed once, or after pulling
npm run uglify     # rebuilds assets/js/main.min.js
```

Always commit **both** `_main.js` and `main.min.js` together. `plotly.min.js` is committed as a static asset and never rebuilt — it is a verbatim copy of `node_modules/plotly.js-dist-min/plotly.min.js`.

---

## Deployment

Push to `master` → GitHub Pages builds automatically (usually 1–2 min). No CI config needed. There is a `.github/workflows/` directory but the actual build is handled natively by GitHub Pages.

---

## Decisions made and why

### Dark theme default (commit `552ba2c`)
The site uses the `contrast` dark theme variant (`_sass/theme/_contrast_dark.scss`). Dark mode is driven by `html[data-theme="dark"]` set in JS via `_main.js`. To prevent a white flash on load:
- A small inline `<script>` in `_includes/head/custom.html` reads `localStorage` and immediately sets `data-theme="dark"` on `<html>` before any rendering.
- Default for new visitors is dark (`localStorage.getItem("theme") || "dark"`).
- The theme toggle in the nav still works; the user's choice is persisted in `localStorage`.

### MathJax and Mermaid lazy-load (commit `852a205`)
Both libraries were fetched from CDN on every page (~2.5 MB total), and Mermaid's top-level `await` kept the browser loading spinner active even on pages with no diagrams. Fixed in `_includes/footer/custom.html`:
- MathJax: injected via JS only if the page contains math content.
- Mermaid: wrapped in `if (document.querySelector('code.language-mermaid'))` before the dynamic `import()` — no diagrams, no fetch.

### Google Analytics 4 (commit `d7a42f6`)
Tracking ID `G-CJKE3B47C0` configured in `_config.yml`. The theme injects the gtag script automatically — do not add raw gtag HTML manually to any template.

### Mobile hamburger menu (commit `7524aa6`)
The original nav had all links in a single `flex-wrap: nowrap` row with no responsive fallback. On screens < 925px everything overflowed. Fixed by:
- **`_includes/masthead.html`**: Added a `.mobile-header` div (title + `<button class="nav-toggle">`) that appears only on mobile. The existing `<ul class="visible-links">` is hidden on mobile and shown as a full-width vertical dropdown when the button is clicked.
- **`assets/css/custom.css`**: `@media (max-width: 924px)` block handles hiding/showing, hamburger → ✕ animation, and full-width mobile list items.
- **`assets/js/_main.js`**: `$('#nav-toggle').on('click', …)` toggles `.nav-open` on `#site-nav`.
- **Breakpoint is 924px** — matches `scssLarge = 925` defined in `_main.js` and `_sass/_themes.scss`.

### Plotly lazy-load (commit `13166ec`)
`plotly.js` (4.7 MB) was bundled into `main.min.js`, loading on every page. Fixed by:
- Removing it from the `npm run uglify` command in `package.json`.
- Saving it as a standalone `assets/js/plotly.min.js`.
- In `_main.js`, checking `document.querySelectorAll("pre>code.language-plotly")` — if zero results, Plotly is never fetched. If charts exist, a `<script>` tag is injected dynamically.
- Result: `main.min.js` dropped from **4,500 KB → 94 KB**.

### Page-load speed fixes (commit `ce6eef7`)
Reduced render-blocking resources and removed accidental MathJax fetches on every page:
- **Font Awesome non-blocking**: `_includes/head/custom.html` loads `font-awesome/5.15.4/css/all.min.css` via `<link rel="preload" as="style" onload="this.rel='stylesheet'">` with a `<noscript>` fallback. Previously it was a plain `<link rel="stylesheet">` and blocked first paint.
- **MathJax is opt-in**: `_includes/footer/custom.html` now wraps the MathJax loader in `{% if page.mathjax %}`. The previous detection scanned `document.body.textContent` for `$$` and matched `[class*="math"]`, which caused false positives and ~1 MB MathJax fetches on pages with no equations. **To enable math on a page, add `mathjax: true` to its front matter.**
- **Preconnect**: added `<link rel="preconnect">` for `cdnjs.cloudflare.com` and `cdn.jsdelivr.net` in `_includes/head/custom.html`.
- **instant.page**: `_includes/footer/custom.html` includes `instant.page@5.2.0` to prefetch internal links on hover, making subsequent navigations feel near-instant.

### Nav consolidation (commit `ce6eef7`)
Working Papers / Teaching / Talks were merged into a single **Research** nav item pointing to `/research/` (new page `_pages/research.md`). The old `_pages/teaching.md`, `_pages/talks.md`, and `_pages/publications.md` (which served `/working-papers/`) are still in the repo as orphan pages — accessible by URL but not linked from the header.

### SEO / structured data fixes (commit `7524aa6`)
Google Search Console reported "Incorrect value type '@type'" (unparsable structured data). Root causes in `_includes/seo.html`:
1. `"sameAs": {{ site.social.links | default: site.social | jsonify }}` — when `links` is null, `site.social` (a hash with null values) was serialised as `{"type":null,…}`, which Google's parser misread as a nested entity with a null `@type`.  
   **Fix**: `{% if site.social.links %}{{ site.social.links | jsonify }}{% else %}[]{% endif %}`
2. `@context` used `http://schema.org` — updated to `https://schema.org` in both JSON-LD blocks.
3. The `name` field in the social block used raw string interpolation instead of `| jsonify`.

---

## Things to keep in mind

- **Never edit `main.min.js` directly** — it is a build artifact. Edit `_main.js` and rebuild.
- **CSS customisation goes in `assets/css/custom.css` only**. Theme SCSS files under `_sass/` are upstream and should not be touched unless absolutely necessary.
- The JS uses **jQuery** (`$`). Do not introduce vanilla-JS patterns that conflict with the existing `$(document).ready` structure.
- `site.social.links` in `_config.yml` is currently empty (null). The `sameAs` field in JSON-LD correctly outputs `[]` in this state — do not add `default: site.social` as a fallback.
- The nav breakpoint **925px** appears in three places: `_main.js` (`scssLarge`), `custom.css` (`max-width: 924px`), and implicitly in the theme SCSS. Keep them in sync if changed.
- Google Analytics 4 is active with tracking ID `G-CJKE3B47C0` in `_config.yml`. The theme injects the gtag script automatically — do not add raw gtag HTML to any template.
- MathJax is **opt-in per page** via `mathjax: true` in front matter. Do not re-introduce body-text scanning in `_includes/footer/custom.html` — it caused false positives.
- Font Awesome is loaded via the preload+onload swap pattern. Keep it that way to avoid render-blocking; the `<noscript>` fallback handles JS-disabled visitors.

---

## Author contact

- Email: dejan.zafirev@uni.li
- Academic profile: https://www.uni.li/en/dejan.zafirev
- GitHub: dejanzafirev
