import sharp from "sharp";
import { readdirSync, existsSync } from "fs";
import { join, extname, basename } from "path";

const dir = new URL("../public/images", import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1");

const files = readdirSync(dir);
let converted = 0;

for (const file of files) {
  const ext = extname(file).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;
  if (file === "logod.webp") continue;

  const input  = join(dir, file);
  const output = join(dir, basename(file, ext) + ".webp");

  if (existsSync(output)) {
    console.log(`  skip: ${file} (webp already exists)`);
    continue;
  }

  await sharp(input).webp({ quality: 87 }).toFile(output);
  console.log(`  ✓ ${file} → ${basename(file, ext)}.webp`);
  converted++;
}

console.log(`\nDone. ${converted} file(s) converted.`);
