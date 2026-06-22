# andreicircei.ro

Personal CV / portfolio site. Static HTML/CSS/JS, hosted on GitHub Pages with the
custom domain `andreicircei.ro`.

> **Demo content.** The copy and links are placeholders — replace the text in
> `index.html` and the social/email links with your real details.

## Files

| File          | Purpose                                          |
| ------------- | ------------------------------------------------ |
| `index.html`  | Page markup and all content                      |
| `styles.css`  | Design system + layout                           |
| `main.js`     | Hero signal animation, scroll reveals            |
| `CNAME`       | Custom domain for GitHub Pages (`andreicircei.ro`) |
| `.nojekyll`   | Serve files as-is (skip Jekyll processing)       |

## Local preview

Open `index.html` directly in a browser, or serve it:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Editing

- **Text & links** — all in `index.html`. Look for the `Demo content` markers.
- **Colours & fonts** — the `:root` block at the top of `styles.css`.
- **Hero animation** — `main.js` (`waves` array controls the trace).
