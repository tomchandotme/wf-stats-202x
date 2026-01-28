import Items from "@wfcd/items";

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

await Bun.write("urls.json", JSON.stringify(urls, null, 2));
console.log("urls.json written to root directory");
