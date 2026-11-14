import fs from "node:fs";
import path from "node:path";

const categories = {
  towers: "TWR",
  enemies: "ENM",
  maps: "MAP",
  equipment: "EQP",
  lore: "LOR",
  mechanics: "MEC",
  guides: "GDE",
  updates: "UPD"
};

const ids = new Set();
const recordsById = new Map();
const errors = [];

for (const [category, prefix] of Object.entries(categories)) {
  const file = path.join(process.cwd(), "data", category, "index.json");
  if (!fs.existsSync(file)) {
    errors.push(`Missing category file: data/${category}/index.json`);
    continue;
  }

  let records;
  try {
    records = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    errors.push(`Invalid JSON in data/${category}/index.json: ${error.message}`);
    continue;
  }

  if (!Array.isArray(records)) {
    errors.push(`data/${category}/index.json must contain an array.`);
    continue;
  }

  const slugs = new Set();
  for (const record of records) {
    if (!record || typeof record !== "object") {
      errors.push(`Invalid record in category ${category}.`);
      continue;
    }

    if (!record.id || !record.slug || !record.name || !record.description) {
      errors.push(`${category}: record missing id, slug, name, or description.`);
      continue;
    }

    if (!record.id.startsWith(`${prefix}-`)) {
      errors.push(`${record.id}: expected category prefix ${prefix}-.`);
    }
    if (ids.has(record.id)) errors.push(`Duplicate record ID: ${record.id}`);
    ids.add(record.id);
    recordsById.set(record.id, record);

    if (slugs.has(record.slug)) errors.push(`Duplicate slug in ${category}: ${record.slug}`);
    slugs.add(record.slug);

    if (record.image) {
      const relativeImage = record.image.replace(/^\\/+/, "");
      const imagePath = path.join(process.cwd(), "public", relativeImage);
      if (!fs.existsSync(imagePath)) errors.push(`${record.id}: image not found: ${record.image}`);
    }
  }
}

for (const [id, record] of recordsById) {
  for (const relatedId of record.relatedRecords || []) {
    if (!ids.has(relatedId)) errors.push(`${id}: related record does not exist: ${relatedId}`);
  }
}

if (errors.length) {
  console.error("Content validation failed:\\n" + errors.map(error => "- " + error).join("\\n"));
  process.exit(1);
}

console.log(`Validated ${ids.size} records across ${Object.keys(categories).length} categories.`);
