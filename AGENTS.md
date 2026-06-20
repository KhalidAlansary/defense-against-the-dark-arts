# Project Instructions

This repository is a Slidev presentation. The main source of truth is [slides.md](slides.md); custom Vue pieces live in [components/](components/); static images live in [public/images/](public/images/).

## Working Rules

- Keep edits focused on the slide deck or the smallest related component.
- Prefer existing layouts, theme settings, and speaker-note patterns already used in [slides.md](slides.md).
- Add reusable UI or interaction behavior in [components/](components/) instead of inlining large blocks into the deck when it will be reused.
- Use [README.md](README.md) as the public-facing project overview; do not duplicate its content here.

## Commands

- `pnpm install` - install dependencies.
- `pnpm run dev` - start the Slidev dev server.
- `pnpm run build` - build the static presentation.
- `pnpm run export` - export the deck.
- `pnpm run fmt` - format the deck and project files.
- `pnpm run fmt:check` - check formatting without changing files.

## Notes

- The deck uses Slidev markdown, Vue components, and mermaid diagrams.
- Preserve the presentation tone and branding unless the task explicitly asks for a redesign.
- If you need broader deck context, start with [README.md](README.md) and the headmatter in [slides.md](slides.md).
