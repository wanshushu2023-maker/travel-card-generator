import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import mammoth from "mammoth";

const rootDir = process.cwd();
const inboxDir = path.join(rootDir, "content-inbox");
const generatedDir = path.join(rootDir, "data", "generated");
const outputFile = path.join(generatedDir, "travel-content.json");
const manifestFile = path.join(generatedDir, "content-manifest.json");

const destinationMatchers = [
  { slug: "bangkok", terms: ["曼谷", "bangkok", "泰国", "thailand"] },
  { slug: "tokyo", terms: ["东京", "tokyo", "日本", "japan"] },
  { slug: "singapore", terms: ["新加坡", "singapore"] },
  { slug: "osaka", terms: ["大阪", "osaka"] },
  { slug: "kuala-lumpur", terms: ["吉隆坡", "kuala lumpur", "malaysia", "马来西亚"] },
  { slug: "bali", terms: ["巴厘岛", "bali", "indonesia", "印尼", "印度尼西亚"] }
];

const fieldRules = [
  {
    key: "airports",
    terms: ["机场", "airport", "bkk", "dmk", "素万那普", "廊曼"],
    excludeTerms: ["机场建设费", "税费", "燃油", "费用", "fee", "tax", "链接", "url"],
    label: "机场"
  },
  {
    key: "feeNotes",
    terms: ["机场建设费", "税费", "燃油", "入境税", "旅游税", "费用", "fee", "tax"],
    label: "费用"
  },
  {
    key: "entryTips",
    terms: ["入境", "签证", "免签", "tdac", "arrival", "immigration"],
    label: "入境"
  },
  {
    key: "visaOptions",
    terms: ["免签", "旅游签", "签证"],
    label: "签证"
  },
  {
    key: "flightPriceNotes",
    terms: ["区间价", "参考区间", "票价", "机票价格", "价格区间"],
    label: "机票区间"
  },
  {
    key: "flightSearchUrl",
    terms: ["机票", "flight", "flights", "ticket", "airline"],
    label: "机票链接",
    urlOnly: true
  },
  {
    key: "hotelSearchUrl",
    terms: ["酒店", "hotel", "booking", "agoda", "携程"],
    label: "酒店链接",
    urlOnly: true
  },
  {
    key: "tdacUrl",
    terms: ["tdac", "immigration", "arrivalcard", "arrival-card"],
    label: "入境卡链接",
    urlOnly: true
  }
];

async function ensureDirs() {
  await fs.mkdir(inboxDir, { recursive: true });
  await fs.mkdir(generatedDir, { recursive: true });
}

async function readJson(file, fallback) {
  try {
    return JSON.parse(await fs.readFile(file, "utf8"));
  } catch {
    return fallback;
  }
}

async function listFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listFiles(fullPath));
    } else if (/\.(txt|md|docx)$/i.test(entry.name) && entry.name !== "README.md") {
      files.push(fullPath);
    }
  }
  return files;
}

async function readContent(file) {
  const ext = path.extname(file).toLowerCase();
  if (ext === ".docx") {
    const result = await mammoth.extractRawText({ path: file });
    return result.value;
  }
  return fs.readFile(file, "utf8");
}

function normalizeText(text) {
  return text
    .replace(/\r/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n");
}

function hashText(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

function detectDestination(file, text) {
  const haystack = `${path.basename(file)}\n${text}`.toLowerCase();
  return destinationMatchers.find((item) => item.terms.some((term) => haystack.includes(term.toLowerCase())))?.slug ?? "bangkok";
}

function splitSentences(text) {
  return text
    .split(/[\n。；;]+/g)
    .map((item) => item.trim())
    .filter((item) => item.length >= 4);
}

function extractUrls(text) {
  return text.match(/https?:\/\/[^\s)）】]+/g) ?? [];
}

function pushUnique(target, value) {
  const clean = value.replace(/\s+/g, " ").trim();
  if (!clean) return;
  if (!target.includes(clean)) target.push(clean);
}

function applyRules(destination, file, text) {
  const sentences = splitSentences(text);
  const urls = extractUrls(text);
  for (const rule of fieldRules) {
    const matched = sentences.filter((sentence) => {
      const lower = sentence.toLowerCase();
      const hasTerm = rule.terms.some((term) => lower.includes(term.toLowerCase()));
      const hasExcludedTerm = rule.excludeTerms?.some((term) => lower.includes(term.toLowerCase()));
      return hasTerm && !hasExcludedTerm && !/^https?:\/\//i.test(sentence);
    });

    if (rule.urlOnly) {
      const linked = urls.find((url) => rule.terms.some((term) => url.toLowerCase().includes(term.toLowerCase())));
      if (linked) destination[rule.key] = linked;
      continue;
    }

    if (!destination[rule.key]) destination[rule.key] = [];
    matched.slice(0, 8).forEach((sentence) => pushUnique(destination[rule.key], sentence));
  }

  if (urls.length) {
    destination.links = destination.links ?? [];
    urls.forEach((url) => pushUnique(destination.links, url));
  }

  const priceRange = text.match(/[¥￥]\s?\d{2,5}\s?[-~至—]\s?[¥￥]?\s?\d{2,5}/);
  if (priceRange) {
    destination.flightPriceRanges = destination.flightPriceRanges ?? {};
    destination.flightPriceRanges["mainland-china"] = priceRange[0].replace(/\s+/g, "");
  }
}

async function main() {
  await ensureDirs();
  const previousManifest = await readJson(manifestFile, {});
  const previousOutput = await readJson(outputFile, { generatedAt: null, sources: [], destinations: {} });
  const files = await listFiles(inboxDir);
  const sources = [];
  const destinations = {};
  const manifest = {};

  for (const file of files) {
    const stat = await fs.stat(file);
    const raw = await readContent(file);
    const text = normalizeText(raw);
    const hash = hashText(text);
    const relativePath = path.relative(rootDir, file);
    const destinationSlug = detectDestination(file, text);
    const changed = previousManifest[relativePath]?.hash !== hash || previousManifest[relativePath]?.mtimeMs !== stat.mtimeMs;

    manifest[relativePath] = {
      hash,
      mtimeMs: stat.mtimeMs,
      size: stat.size,
      destination: destinationSlug
    };

    sources.push({
      path: relativePath,
      destination: destinationSlug,
      changed,
      updatedAt: stat.mtime.toISOString(),
      excerpt: text.slice(0, 180)
    });

    destinations[destinationSlug] = destinations[destinationSlug] ?? {};
    applyRules(destinations[destinationSlug], file, text);
  }

  const output = {
    generatedAt: new Date().toISOString(),
    sources,
    destinations
  };

  await fs.writeFile(outputFile, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  await fs.writeFile(manifestFile, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

  const changedCount = sources.filter((source) => source.changed).length;
  console.log(`扫描完成：${files.length} 个文件，${changedCount} 个新增或变动文件。`);
  console.log(`已更新：${path.relative(rootDir, outputFile)}`);

  if (!files.length && previousOutput.generatedAt === null) {
    console.log("content-inbox 目前没有资料文件。你可以先放 txt、md 或 docx 后再运行。");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
