// VS Code "Format Document" shim, used via the jkillian.custom-local-formatters
// extension (configured as the markdown formatter). Reads markdown on stdin and
// writes formatted markdown to stdout, so it runs on the format action / a format
// keybind (not forced on save).
//
// Slidev decks are formatted with `slidev format`; all other markdown is
// delegated to oxfmt, so non-slide docs (README, etc.) keep their normal
// formatting instead of being passed through untouched. A file is a slide deck
// if it follows Slidev's layout: the slides.md entry, or any markdown under a
// pages/ directory (external slides included via the `src:` attribute).
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { basename, dirname, join } from "node:path";

const input = readFileSync(0, "utf8");
const filePath = process.argv[2] ?? "";

const require = createRequire(import.meta.url);
const binOf = (pkg, ...rel) => join(dirname(require.resolve(`${pkg}/package.json`)), ...rel);

const segments = filePath.split(/[\\/]/);
const isSlideFile = basename(filePath) === "slides.md" || segments.includes("pages");

function formatSlide() {
  const dir = mkdtempSync(join(tmpdir(), "slidev-fmt-"));
  const tmp = join(dir, "slides.md");
  try {
    writeFileSync(tmp, input);
    const res = spawnSync(
      process.execPath,
      [binOf("@slidev/cli", "bin", "slidev.mjs"), "format", tmp],
      {
        stdio: ["ignore", "ignore", "inherit"],
      },
    );
    // On failure, leave the document untouched.
    return res.status === 0 ? readFileSync(tmp, "utf8") : input;
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

function formatMarkdown() {
  const res = spawnSync(
    process.execPath,
    [binOf("oxfmt", "bin", "oxfmt"), `--stdin-filepath=${filePath}`],
    {
      input,
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    },
  );
  return res.status === 0 && res.stdout ? res.stdout : input;
}

process.stdout.write(isSlideFile ? formatSlide() : formatMarkdown());
