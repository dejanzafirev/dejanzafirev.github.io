# dejanzafirev.github.io

Source for my personal academic website — **[dejanzafirev.github.io](https://dejanzafirev.github.io)**.

I'm Dejan Zafirev, a PhD student and Research Assistant in Financial Economics at the
University of Liechtenstein.

## How it works

The site is a single hand-written page: `index.html`, with the CSS inside it. There is no
framework and no build step. The empty `.nojekyll` file tells GitHub Pages to serve the files
as they are. Pushing to `master` publishes the site in 1–2 minutes.

## Where to edit

| To change... | Edit |
|------|------|
| Text, links, sections | `index.html` |
| CV | replace `files/cv.pdf` (LaTeX source: `files/cv.tex`) |
| Photo | `images/pic.JPG` |
| Social preview image | `images/og-card.png` |
| Colors and fonts | the `<style>` block at the top of `index.html` |

## Other files

| File | Purpose |
|------|------|
| `research/`, `cv/`, `contact/`, `talks/` | Redirect stubs so old links still work |
| `robots.txt`, `sitemap.xml` | Search engines |
| `google559056fe9755c648.html` | Google Search Console verification — keep it |

Google Analytics (`G-CJKE3B47C0`) is the `gtag` snippet in the `<head>` of `index.html`.

## Preview locally

```
python -m http.server 8000
```

then open http://localhost:8000.
