const fs = require("fs");
const path = require("path");

const projectRoot = process.cwd();
const distDir = process.env.NEXT_DIST_DIR || ".next";
const targets = [distDir, "tsconfig.tsbuildinfo"];

if (process.env.CLEAN_EXPORT === "true") {
  targets.push("out");
}

for (const target of targets) {
  const targetPath = path.join(projectRoot, target);

  try {
    fs.rmSync(targetPath, { recursive: true, force: true });
    console.log(`[clean] removed ${target}`);
  } catch (error) {
    console.warn(`[clean] failed to remove ${target}:`, error);
  }
}
