import Items from "@wfcd/items";
import { writeFileSync, mkdirSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(__dirname, "../data");

const items = new Items({
  category: ["Warframes", "Primary", "Secondary", "Melee"],
});

const urls: Record<string, string> = {};

items.forEach((v) => {
  if (v.name && v.imageName) {
    urls[v.name] = v.imageName;
  }

  if (v.category === "Warframes" && v.name.endsWith(" Prime")) {
    const normalName = v.name.replace(" Prime", "");

    if (v.imageName) {
      urls[normalName] = v.imageName;
    }
  }
});

// Ensure data directory exists
mkdirSync(dataDir, { recursive: true });

const outputPath = resolve(dataDir, "urls.json");
writeFileSync(outputPath, JSON.stringify(urls, null, 2));
console.log("urls.json written to `/data` directory");
