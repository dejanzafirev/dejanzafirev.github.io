# Copilot instructions for dejanzafirev/dejanzafirev.github.io

Purpose: help future Copilot sessions navigate, build, and modify this repository (Academic Pages / Jekyll site).

---

## Build / test / lint commands

- Node (JS asset build)
  - npm run build:js — runs the configured uglify pipeline and creates assets/js/main.min.js
  - npm run uglify — single-step uglify command (use to build the single JS bundle)
  - npm run watch:js — watch JS sources and rebuild the bundle

- Ruby / Jekyll (site build / serve)
  - bundle exec jekyll build — build the static site (uses Gemfile / github-pages)
  - bundle exec jekyll serve — serve locally (restart required if _config.yml changes)

- Docker (optional containerized build)
  - docker-compose up --build

- Tests / lint: No automated test or lint scripts detected in this repository.

- Single-test note: no test framework present; run the specific script (e.g., npm run uglify) directly to exercise one step.

---

## High-level architecture

- This is a Jekyll-based static site built from the Academic Pages template (see Gemfile and package.json).
- Content sources:
  - markdown pages and posts under `_pages`, collection folders (e.g., `_teaching`), and top-level markdown files.
  - _data (e.g., `_data/cv.json`, `_data/navigation.yml`) are used by templates and sometimes generated from scripts.
- Layout and rendering:
  - `_layouts` and `_includes` contain Liquid templates and partials that compose pages.
  - `_sass` and `assets/css` provide site styles; `assets/js` and `assets/js/plugins` are the JS sources.
- Asset pipeline:
  - JS assets are minified via npm scripts (uglify) into `assets/js/main.min.js`.
  - Ruby Gems (github-pages) provide Jekyll plugins and rendering behavior.
- Data-generation tools:
  - `scripts/` and `markdown_generator/` contain Python scripts and notebooks that transform TSV/CSV/BibTeX into Markdown or JSON (e.g., `scripts/cv_markdown_to_json.py`, `markdown_generator/publications.py`).
  - `scripts/update_cv_json.sh` wraps the CV markdown→JSON conversion and optionally triggers a local jekyll serve.
- Automation:
  - `.github/workflows/scrape_talks.yml` runs a Jupyter notebook to update talk locations and commits results automatically.

---

## Key conventions (repo-specific)

- Collections configured in `_config.yml`: `teaching`, `publications`, `portfolio`, `talks`. Place collection items in the matching folders and use YAML front matter.
- Permalink convention: `/:categories/:title/` (set in `_config.yml`) — expect URLs to follow category/title structure.
- CV workflow: source `_pages/cv.md` → run `scripts/cv_markdown_to_json.py` (or `scripts/update_cv_json.sh`) → output `_data/cv.json`. Use this to keep the JSON-based CV in sync with the markdown CV.
- Talk map workflow: `talkmap.ipynb` and `markdown_generator/talks.tsv` are used with the GitHub Actions workflow to populate `talkmap/` assets and commit updates.
- JS asset updates: edit JS under `assets/js` or `assets/js/plugins` and run `npm run build:js` to produce `assets/js/main.min.js`. The repo includes a prebuilt `assets/js/main.min.js` for production.
- Exclusions: `_config.yml` contains a list of excluded files (e.g., package.json*, node_modules, vendor). Be mindful when editing excluded files.
- Theme configuration: site theme and many defaults are set in `_config.yml`. Changing theme or plugin lists will change rendering; restart jekyll when making config changes.

---

## Useful files to inspect when answering repo questions

- `_config.yml`, `Gemfile`, `package.json` — site config and build tooling
- `scripts/` and `markdown_generator/` — data generation, CV conversion, and publication/talk generators
- `_layouts/`, `_includes/`, `_sass/` — rendering and styling
- `.github/workflows/scrape_talks.yml` — example CI automation that runs notebooks and commits changes

---

If this file already exists, incorporate these points rather than replacing other repository-specific guidance.
