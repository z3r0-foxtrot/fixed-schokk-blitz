import fs from "node:fs";
import path from "node:path";
const categories=["towers","enemies","maps","equipment","lore","mechanics","guides","updates"];
const ids=new Set();const slugs=new Set();const errors=[];
for(const category of categories){
 const file=path.join(process.cwd(),"data",category,"index.json");
 const records=JSON.parse(fs.readFileSync(file,"utf8"));
 for(const r of records){
  if(!r.id||!r.slug||!r.name||!r.description)errors.push(`${category}: record missing id, slug, name, or description`);
  if(ids.has(r.id))errors.push(`Duplicate record ID: ${r.id}`);ids.add(r.id);
  const key=`${category}/${r.slug}`;if(slugs.has(key))errors.push(`Duplicate slug: ${key}`);slugs.add(key);
  if(r.image&&!fs.existsSync(path.join(process.cwd(),"public",r.image.replace(/^\\//,""))))errors.push(`${r.id}: image not found: ${r.image}`);
 }
}
if(errors.length){console.error("Content validation failed:\\n"+errors.map(x=>"- "+x).join("\\n"));process.exit(1);}
console.log(`Validated ${ids.size} records across ${categories.length} categories.`);
