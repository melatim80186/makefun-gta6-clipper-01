import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// makefun-gta6-clipper-01: hand the video address to the house.
// The clip lives on YouTube; this program only validates VIDEO.json
// and drops a copy where the grader expects it. No network, no deps.

const scriptDir = dirname(fileURLToPath(import.meta.url));
const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

function die(message: string): never {
  console.error(`gta6-clipper-01: ${message}`);
  process.exit(1);
}

function findVideoFile(): string {
  const candidates = [
    join(resolve(botDir), "VIDEO.json"),
    join(scriptDir, "VIDEO.json"),
  ];
  for (const candidate of candidates) {
    if (existsSync(candidate)) return candidate;
  }
  die(
    `VIDEO.json not found (looked in ${resolve(botDir)} and ${scriptDir})`,
  );
}

const videoFile = findVideoFile();

let parsed: unknown;
try {
  parsed = JSON.parse(readFileSync(videoFile, "utf8"));
} catch (error) {
  die(`VIDEO.json does not parse: ${(error as Error).message}`);
}

if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
  die("VIDEO.json must contain a JSON object");
}

const url = (parsed as Record<string, unknown>).url;
if (typeof url !== "string" || url.trim().length === 0) {
  die('VIDEO.json must contain a "url" string');
}
if (!url.startsWith("https://")) {
  die('VIDEO.json "url" must start with https://');
}
let host: string;
try {
  host = new URL(url).hostname;
} catch {
  die(`VIDEO.json "url" is not a valid URL: ${url}`);
}
if (host !== "www.youtube.com" && host !== "youtube.com" && host !== "youtu.be") {
  die(`VIDEO.json "url" must point at YouTube, got host ${host}`);
}

mkdirSync(outputDir, { recursive: true });
const target = join(resolve(outputDir), "VIDEO.json");
try {
  copyFileSync(videoFile, target);
} catch (error) {
  die(`could not write ${target}: ${(error as Error).message}`);
}
