import site from "@/data/site.json";
import towers from "@/data/towers/index.json";
import enemies from "@/data/enemies/index.json";
import maps from "@/data/maps/index.json";
import equipment from "@/data/equipment/index.json";
import lore from "@/data/lore/index.json";
import mechanics from "@/data/mechanics/index.json";
import guides from "@/data/guides/index.json";
import updates from "@/data/updates/index.json";
import type { Category, CategoryKey, RecordItem } from "./types";

export const siteConfig = site;
export const categories: Category[] = [
  { key:"towers", title:"Towers", prefix:"TWR", description:"Defensive units, tower statistics, upgrade paths, and abilities." },
  { key:"enemies", title:"Enemies", prefix:"ENM", description:"Enemy units, attributes, resistances, and encounter behavior." },
  { key:"maps", title:"Maps", prefix:"MAP", description:"Battlefields, environments, hazards, and map-specific mechanics." },
  { key:"equipment", title:"Equipment", prefix:"EQP", description:"Equipment, items, utilities, and their gameplay functions." },
  { key:"lore", title:"Lore", prefix:"LOR", description:"Organizations, people, events, locations, and universe documentation." },
  { key:"mechanics", title:"Game Mechanics", prefix:"MEC", description:"Systems and rules that define how Schokk Blitz works." },
  { key:"guides", title:"Guides", prefix:"GDE", description:"Player guidance, tactics, walkthroughs, and reference material." },
  { key:"updates", title:"Updates", prefix:"UPD", description:"Official game updates, patch notes, and balance changes." }
];
const database: Record<CategoryKey, RecordItem[]> = {
  towers: towers as RecordItem[], enemies: enemies as RecordItem[], maps: maps as RecordItem[],
  equipment: equipment as RecordItem[], lore: lore as RecordItem[], mechanics: mechanics as RecordItem[],
  guides: guides as RecordItem[], updates: updates as RecordItem[]
};
export function getRecords(category: CategoryKey) { return database[category] ?? []; }
export function getAllRecords() {
  return categories.flatMap(category => getRecords(category.key).map(record => ({...record, category:category.key, categoryTitle:category.title})));
}
export function getCategory(key: string) { return categories.find(c => c.key === key); }
export function getRecord(category: string, slug: string) {
  if (!categories.some(c => c.key === category)) return undefined;
  return getRecords(category as CategoryKey).find(record => record.slug === slug);
}
export function findRecordById(id: string) {
  return getAllRecords().find(record => record.id === id);
}
export function getRecordCount() { return getAllRecords().length; }
