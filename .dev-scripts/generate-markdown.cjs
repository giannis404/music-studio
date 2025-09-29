/**
 * genmd.js
 * Usage:
 *   node .dev-scripts/genmd.js components/button components/card
 *
 * Generates a Markdown file containing all files in the target folder(s),
 * plus folder trees at the end.
 */

const fs = require("fs");
const path = require("path");

const targetArgs = process.argv.slice(2);

if (targetArgs.length === 0) {
  console.error("❌ Please provide one or more target folders. Example:");
  console.error("   npm run genmd components/button components/card");
  process.exit(1);
}

const targetPaths = targetArgs.map((arg) => path.resolve(process.cwd(), arg));

// output file name
const outputFile =
  targetArgs.length === 1
    ? path.resolve(`${path.basename(targetArgs[0])}.md`)
    : path.resolve(`digest.md`);

// validate
targetPaths.forEach((targetPath) => {
  if (!fs.existsSync(targetPath)) {
    console.error(`❌ Target path does not exist: ${targetPath}`);
    process.exit(1);
  }
});

/**
 * Recursively collect files under a folder.
 */
function getFilesRecursively(dir) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  list.forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath));
    } else {
      results.push(fullPath);
    }
  });
  return results;
}

/**
 * Generate a tree structure string for the folder.
 */
function generateTree(dir, prefix = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  let output = "";
  entries.forEach((entry, index) => {
    const isLast = index === entries.length - 1;
    const branch = isLast ? "└── " : "├── ";
    const nextPrefix = prefix + (isLast ? "    " : "│   ");

    output += `${prefix}${branch}${entry.name}\n`;

    if (entry.isDirectory()) {
      output += generateTree(path.join(dir, entry.name), nextPrefix);
    }
  });

  return output;
}

/**
 * Detect if a file should be skipped due to binary type or size.
 */
function shouldSkipFile(file) {
  const skipExts = [
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".bmp",
    ".svg",
    ".ico",
    ".woff",
    ".woff2",
    ".ttf",
    ".eot",
    ".mp3",
    ".mp4",
    ".avi",
    ".mov",
    ".pdf",
  ];
  const ext = path.extname(file).toLowerCase();
  if (skipExts.includes(ext)) return true;

  const stats = fs.statSync(file);
  if (stats.size > 200 * 1024) return true; // >200KB
  return false;
}

/**
 * Main: Write file contents + trees into Markdown.
 */
function generateMarkdown(targetPaths, outputFile) {
  let md = `# Code Digest\n\n`;

  targetPaths.forEach((targetPath) => {
    const relTarget = path.relative(process.cwd(), targetPath);
    md += `# Folder: ${relTarget}\n\n`;

    const allFiles = getFilesRecursively(targetPath);

    allFiles.forEach((file) => {
      const relPath = path.relative(process.cwd(), file);
      const ext = path.extname(file).substring(1);

      md += `---\n\n`;
      md += `## START: ${relPath}\n\n`;

      if (shouldSkipFile(file)) {
        md += "```txt\n// ⚠️ Skipped: binary or large file\n```\n";
      } else {
        const content = fs.readFileSync(file, "utf-8");
        if (content.trim().length === 0) {
          md += "```txt\n// ⬜ Empty file\n```\n";
        } else {
          md += "```" + (ext || "") + "\n" + content + "\n```\n";
        }
      }

      md += `\n## END: ${relPath}\n\n`;
    });

    md += "---\n\n";
    md += `## Folder Structure: ${relTarget}\n\n`;
    md += "```\n";
    md += `/${path.basename(targetPath)}\n`;
    md += generateTree(targetPath);
    md += "```\n\n";
  });

  fs.writeFileSync(outputFile, md, "utf-8");
  console.log(`✅ Markdown generated: ${outputFile}`);
}

generateMarkdown(targetPaths, outputFile);
