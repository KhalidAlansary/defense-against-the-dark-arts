# Welcome to [Slidev](https://github.com/slidevjs/slidev)!

To start the slide show:

- `pnpm install`
- `pnpm run dev`
- visit <http://localhost:3030>

Edit the [slides.md](./slides.md) to see the changes.

Learn more about Slidev at the [documentation](https://sli.dev/).
# Thesis Defense — Slidev Template

A clean, presentation-ready [Slidev](https://sli.dev) template for a Master's or
PhD thesis defense. Edit `slides.md` and present from the browser.

## Quick start

```bash
cd thesis-defense
npm install        # first time only
npm run dev        # opens http://localhost:3030
```

Edit `slides.md` — the deck hot-reloads in the browser as you save.

## Structure

```
thesis-defense/
├── slides.md              # ← your presentation (edit this)
├── package.json
├── public/images/         # figures, plots, logos (referenced as /images/…)
├── components/            # optional custom Vue components
└── snippets/              # optional external code snippets
```

## The deck

The template walks the canonical defense arc — replace the placeholder text:

1. **Title** — title, your name, advisor & committee
2. **Motivation & Problem** — the gap, research questions, thesis statement
3. **Background & Related Work** — concepts + positioning table
4. **Approach & Methods** — pipeline diagram, core idea, formalization
5. **Experiments & Results** — setup, main result, qualitative, ablation
6. **Discussion** — limitations, threats to validity
7. **Contributions & Future Work** — mapped back to the research questions
8. **Conclusion + Thank You**
9. **Backup slides** — for anticipated Q&A

## Presenting

| Key | Action |
|-----|--------|
| `→` / `Space` | next click / slide |
| `←` | previous |
| `o` | slide overview (jump anywhere) |
| `p` | presenter mode (speaker notes + timer) |
| `d` | toggle dark mode |
| `g` | go to slide number |
| `f` | fullscreen |

Speaker notes live in `<!-- ... -->` blocks after each slide and show in
presenter mode (`p`).

## Adding figures

Drop images in `public/images/` and reference them as `/images/your-fig.png`
either in markdown (`![alt](/images/your-fig.png)`) or in `image:` frontmatter
for the `image-right` / `image-left` layouts.

## Exporting

```bash
npm run export-pdf     # → dist/thesis-defense.pdf (needs playwright-chromium)
npm run build          # → static site in dist/ (host anywhere)
```

The first export run installs the headless browser: `npx playwright install chromium`.

## Customizing

- **Theme/colors:** change `theme:` in the headmatter, or override the accent
  color (currently teal) by find-replacing `teal-500` in `slides.md`.
- **Fonts:** edit the `fonts:` block in the headmatter.
- **Other themes:** `seriph`, `default`, `apple-basic`, `academic` — see
  https://sli.dev/resources/theme-gallery

## Docs

- Slidev guide: https://sli.dev/guide/
- Markdown syntax & layouts: https://sli.dev/guide/syntax
- Built-in components: https://sli.dev/builtin/components
