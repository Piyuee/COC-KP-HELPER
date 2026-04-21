#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const APP_JS = path.join(ROOT, "src", "app.js");
const INDEX_HTML = path.join(ROOT, "index.html");
const README = path.join(ROOT, "README.md");
const DOCS_DIR = path.join(ROOT, "docs");
const REQUIRED_INTERACTION_ATTRS = [
  "data-toggle-clue-prop-favorite",
  "data-copy-clue-prop-content",
  "data-insert-clue-prop-log",
  "data-mark-clue-prop-used",
];

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function toCamelDataKey(attr) {
  return attr.replace(/^data-/, "").replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function isExternalLink(target) {
  return /^(https?:|mailto:|tel:)/i.test(target);
}

function resolveLocalTarget(baseFile, target) {
  const withoutHash = target.split("#")[0];
  if (!withoutHash) return null;
  if (withoutHash.startsWith("/")) return withoutHash;
  return path.resolve(path.dirname(baseFile), withoutHash);
}

function collectButtonTags(source) {
  return [...source.matchAll(/<button[\s\S]*?>/g)].map((match) => match[0]);
}

function collectMarkdownLinks(source) {
  return [...source.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map((match) => match[1].trim());
}

function collectAttributeLinks(source) {
  const targets = [];
  for (const match of source.matchAll(/\b(?:href|src)\s*=\s*"([^"]+)"/g)) {
    targets.push(match[1].trim());
  }
  return targets;
}

function lineNumberOf(content, snippet) {
  const idx = content.indexOf(snippet);
  if (idx < 0) return 1;
  return content.slice(0, idx).split("\n").length;
}

function main() {
  const issues = [];

  const appJs = read(APP_JS);
  const indexHtml = read(INDEX_HTML);
  const docs = fs
    .readdirSync(DOCS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => path.join(DOCS_DIR, file));

  const sourceFiles = [INDEX_HTML, APP_JS];
  const buttonAttrs = new Set();

  for (const file of sourceFiles) {
    const content = read(file);
    const buttonTags = collectButtonTags(content);

    for (const tag of buttonTags) {
      const hasType = /\btype\s*=\s*["'](button|submit|reset)["']/i.test(tag);
      if (!hasType) {
        const line = lineNumberOf(content, tag);
        issues.push(`[按钮类型] ${file}:${line} 发现未声明 type 的 button，可能导致点击异常。`);
      }

      for (const match of tag.matchAll(/\b(data-[a-z0-9-]+)\s*=/g)) {
        buttonAttrs.add(match[1]);
      }
    }
  }

  for (const attr of [...buttonAttrs].sort()) {
    const hasSelector = appJs.includes(`[${attr}]`);
    const hasDataset = appJs.includes(`dataset.${toCamelDataKey(attr)}`);
    if (!hasSelector && !hasDataset) {
      issues.push(`[事件绑定] ${attr} 看起来用于点击交互，但未在 src/app.js 找到选择器或 dataset 读取。`);
    }
  }

  for (const attr of REQUIRED_INTERACTION_ATTRS) {
    const existsInMarkup = sourceFiles.some((file) => read(file).includes(attr));
    if (!existsInMarkup) {
      issues.push(`[关键交互] ${attr} 未在页面标记中出现，可能遗漏了预期按钮。`);
      continue;
    }
    const hasSelector = appJs.includes(`[${attr}]`);
    const hasDataset = appJs.includes(`dataset.${toCamelDataKey(attr)}`);
    if (!hasSelector && !hasDataset) {
      issues.push(`[关键交互] ${attr} 已出现但未找到事件绑定，可能会出现点击无响应。`);
    }
  }

  for (const target of collectAttributeLinks(indexHtml)) {
    if (!target || target.startsWith("#") || isExternalLink(target)) continue;
    const resolved = resolveLocalTarget(INDEX_HTML, target);
    if (resolved && !fs.existsSync(resolved)) {
      issues.push(`[页面资源] ${INDEX_HTML} 引用了不存在的资源：${target}`);
    }
  }

  const markdownFiles = [README, ...docs];
  for (const file of markdownFiles) {
    const content = read(file);
    for (const target of collectMarkdownLinks(content)) {
      if (!target || target.startsWith("#") || isExternalLink(target)) continue;
      const resolved = resolveLocalTarget(file, target);
      if (resolved && !fs.existsSync(resolved)) {
        issues.push(`[文档链接] ${file} 中链接不存在：${target}`);
      }
    }
  }

  if (issues.length) {
    console.error("Link audit failed:");
    for (const issue of issues) {
      console.error(`- ${issue}`);
    }
    process.exit(1);
  }

  console.log("Link audit passed: no dead clickable bindings or broken local links found.");
}

main();
