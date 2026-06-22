# andreicircei.ro

Personal CV / portfolio site for Andrei Cîrcei — software engineer (embedded
systems & automation). Static HTML/CSS/JS, hosted on GitHub Pages with the
custom domain `andreicircei.ro` (HTTPS enforced).

Design: "Swiss editorial" — light cool-gray ground, ink type, a single
electric-blue accent. Space Grotesk (display + body) and IBM Plex Mono (labels).

## Files

| File          | Purpose                                            |
| ------------- | -------------------------------------------------- |
| `index.html`  | Page markup and all content                        |
| `styles.css`  | Design system + layout (`:root` holds the palette) |
| `main.js`     | Footer year + reveal-on-scroll                     |
| `CNAME`       | Custom domain (`andreicircei.ro`)                  |
| `.nojekyll`   | Serve files as-is (skip Jekyll)                    |

## Local preview

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Editing

- **Text & links** — all in `index.html`.
- **Colours & fonts** — the `:root` block at the top of `styles.css`.
