// Format (or, with --check, verify formatting of) all sources.
//   - oxfmt handles everything except the Slidev decks (see .oxfmtrc.json)
//   - slidev format handles the decks (oxfmt mangles Slidev frontmatter)
// Both run in parallel; the process exits non-zero if either fails.
import { spawn } from "node:child_process";
import { cpSync, existsSync, mkdtempSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";

const check = process.argv.includes("--check");

// shell:true lets the system shell resolve the node_modules/.bin entry that
// pnpm puts on PATH, which is what makes this work on Windows too.
const runShell = (command) =>
  new Promise((resolve) => {
    spawn(command, { stdio: "inherit", shell: true }).on("close", (code) => resolve(code ?? 1));
  });

const slidevBin = join(
  createRequire(import.meta.url).resolve("@slidev/cli/package.json"),
  "..",
  "bin",
  "slidev.mjs",
);

// Run slidev via the resolved bin (no shell) so file args with spaces are safe.
const runSlidev = (args) =>
  new Promise((resolve) => {
    spawn(process.execPath, [slidevBin, ...args], { stdio: "inherit" }).on("close", (code) =>
      resolve(code ?? 1),
    );
  });

// Slide decks follow Slidev's layout: the slides.md entry plus any markdown
// under pages/ (external slides included via the `src:` attribute). slidev
// format does not follow `src:` includes, so each file is formatted explicitly.
const slideFiles = () => [
  "slides.md",
  ...(existsSync("pages")
    ? readdirSync("pages", { recursive: true })
        .filter((p) => p.endsWith(".md"))
        .map((p) => join("pages", p))
    : []),
];

const formatCode = () => runShell(check ? "oxfmt --check" : "oxfmt");

async function formatSlides() {
  const files = slideFiles();
  if (!check) return runSlidev(["format", ...files]);

  // slidev format has no check mode, so format a copy of the deck and diff it.
  // The whole deck is copied so relative `src:` includes still resolve.
  const dir = mkdtempSync(join(tmpdir(), "slidev-fmt-"));
  try {
    cpSync("slides.md", join(dir, "slides.md"));
    if (existsSync("pages")) cpSync("pages", join(dir, "pages"), { recursive: true });

    const code = await runSlidev(["format", ...files.map((f) => join(dir, f))]);
    if (code !== 0) return code;

    for (const f of files) {
      if (readFileSync(f, "utf8") !== readFileSync(join(dir, f), "utf8")) {
        console.error(`${f} is not formatted — run 'pnpm fmt'.`);
        return 1;
      }
    }
    return 0;
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

const codes = await Promise.all([formatCode(), formatSlides()]);
process.exit(codes.some((code) => code !== 0) ? 1 : 0);
