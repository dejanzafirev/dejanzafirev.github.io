# dejanzafirev.github.io

Source for my personal academic website — **[dejanzafirev.github.io](https://dejanzafirev.github.io)**.

I'm Dejan Zafirev, a PhD student and Research Assistant in Financial Economics at the
University of Liechtenstein. The site hosts my research, talks, and CV.

## Tech stack

- [Jekyll](https://jekyllrb.com/) static site, built and deployed automatically by GitHub Pages on push to `master`.
- Based on the [Academic Pages](https://github.com/academicpages/academicpages.github.io) theme (a fork of [Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes)).

## Structure

| Path | Purpose |
|------|---------|
| `_config.yml` | Site settings (title, author, theme, SEO) |
| `_data/navigation.yml` | Header navigation |
| `_pages/` | Pages: about (home), research, cv, contact |
| `_talks/` | Talks and presentations (one Markdown file per talk) |
| `assets/css/custom.css` | Custom styles |
| `assets/js/_main.js` | JS source (rebuild `main.min.js` with `npm run uglify`) |

## Run locally

```bash
bundle install
bundle exec jekyll serve
# open http://localhost:4000
```

## License

Site content © Dejan Zafirev. Theme released under the
[MIT License](LICENSE) by the Academic Pages / Minimal Mistakes authors.
