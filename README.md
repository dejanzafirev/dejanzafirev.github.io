# dejanzafirev.github.io

Source for my personal academic website — **[dejanzafirev.github.io](https://dejanzafirev.github.io)**.

I'm Dejan Zafirev, a PhD student and Research Assistant in Financial Economics at the
University of Liechtenstein. The site hosts my research, talks, and CV.

## Tech stack

- [Jekyll](https://jekyllrb.com/) static site, built and deployed automatically by GitHub Pages on push to `master`.
- Based on the [Academic Pages](https://github.com/academicpages/academicpages.github.io) theme (a fork of [Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes)).

## Where to edit

These are the only places that need editing for normal updates:

| To change... | Edit |
|------|------|
| Page text (about / research / cv / contact) | `_pages/` |
| Add or edit a talk | `_talks/` (one Markdown file per talk) |
| The header menu | `_data/navigation.yml` |
| Site title, name, theme, SEO | `_config.yml` |
| Custom colors / styling | `assets/css/custom.css` |

**Leave everything else alone** — `_layouts/`, `_includes/`, `_sass/`, and `assets/js/`
are the theme engine. `_site/` is auto-generated output (gitignored; never edit it).

## Where the HTML lives

There is no single HTML file per page. Jekyll assembles each page from pieces:

| Piece | Location |
|------|------|
| Page content (Markdown, or HTML in `_pages/talks.html`) | `_pages/`, `_talks/` |
| Page skeleton (`<html>`, `<body>`, wrappers) | `_layouts/default.html`, `single.html`, `archive.html`, `talk.html` |
| `<head>`, meta tags, SEO | `_includes/head.html`, `_includes/head/custom.html`, `_includes/seo.html` |
| Header / nav | `_includes/masthead.html` |
| Left sidebar (author card) | `_includes/author-profile.html`, `_includes/sidebar.html` |
| Footer and lazy-loaded scripts | `_includes/footer.html`, `_includes/footer/custom.html`, `_includes/scripts.html` |
| Google Analytics | `_config.yml` (`analytics:`), template in `_includes/analytics-providers/` |

Static files: `images/` (photos), `files/` (CV PDF/TeX), `assets/` (CSS, JS).

> Note: the `_`-prefixed folder names are required by Jekyll and **must not be renamed**.

## Run locally

```bash
bundle install
bundle exec jekyll serve
# open http://localhost:4000
```

## License

Site content © Dejan Zafirev. Theme released under the
[MIT License](LICENSE) by the Academic Pages / Minimal Mistakes authors.
