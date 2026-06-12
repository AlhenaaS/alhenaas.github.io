# Alhenas — static GitHub Pages site

## What to edit
- `data/bots.json` — bot entries, tags, downloads, alt versions
- `data/toolkit.json` — presets, extensions, regex, tutorials
- `assets/bots/...` — bot preview images and downloadable files
- `css/themes.css` — light/dark palette

## GitHub Pages deployment
GitHub Pages normally publishes from the repository root or `/docs`.

### Option A — publish from repo root
Move the contents of this `site/` folder into the repository root.

### Option B — publish from `/docs`
Rename `site/` to `docs/` and enable Pages for the `/docs` folder in repository settings.

The site uses only static HTML, CSS, JS, JSON, and local assets, so it is compatible with GitHub Pages.

## Notes
- Theme preference is stored in `localStorage` under `alhenas-theme`.
- Bot cards and toolkit sections are rendered from JSON data.
- `.nojekyll` is included for GitHub Pages compatibility.
