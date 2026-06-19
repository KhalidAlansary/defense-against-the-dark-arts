// Format (or, with --check, verify formatting of) all sources.
//   - oxfmt handles everything except slides.md (see .oxfmtrc.json ignorePatterns)
//   - slidev format handles slides.md (oxfmt mangles Slidev frontmatter)
// Both run in parallel; the process exits non-zero if either fails.
import { spawn } from "node:child_process";
import { copyFileSync, mkdirSync, readFileSync, rmSync } from "node:fs";

const check = process.argv.includes("--check");

// shell:true lets the system shell resolve the node_modules/.bin entries that
// pnpm puts on PATH, which is what makes this work on Windows too.
const run = (command) =>
  new Promise((resolve) => {
    spawn(command, { stdio: "inherit", shell: true }).on("close", (code) => resolve(code ?? 1));
  });

const formatCode = () => run(check ? "oxfmt --check" : "oxfmt");

async function formatSlides() {
  if (!check) return run("slidev format");

  // slidev format has no check mode, so format a throwaway copy and diff it.
  // Kept under node_modules/.cache (gitignored, oxfmt-ignored, no spaces).
  const tmp = "node_modules/.cache/slides-fmt-check.md";
  mkdirSync("node_modules/.cache", { recursive: true });
  copyFileSync("slides.md", tmp);
  try {
    const code = await run(`slidev format ${tmp}`);
    if (code !== 0) return code;
    if (readFileSync("slides.md", "utf8") !== readFileSync(tmp, "utf8")) {
      console.error("slides.md is not formatted — run 'pnpm fmt'.");
      return 1;
    }
    return 0;
  } finally {
    rmSync(tmp, { force: true });
  }
}

const codes = await Promise.all([formatCode(), formatSlides()]);
process.exit(codes.some((code) => code !== 0) ? 1 : 0);
