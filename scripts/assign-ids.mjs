import fs from "node:fs";
import path from "node:path";
const root=process.cwd();
const categories={towers:"TWR",enemies:"ENM",maps:"MAP",equipment:"EQP",lore:"LOR",mechanics:"MEC",guides:"GDE",updates:"UPD"};
const registryPath=path.join(root,"data/id-registry.json");
const registry=fs.existsSync(registryPath)?JSON.parse(fs.readFileSync(registryPath,"utf8")):{};
let changed=false;
for(const [category,prefix] of Object.entries(categories)){
 const file=path.join(root,"data",category,"index.json");
 if(!fs.existsSync(file)) continue;
 const records=JSON.parse(fs.readFileSync(file,"utf8"));
 let max=0;
 for(const id of Object.values(registry)){if(typeof id==="string"&&id.startsWith(prefix+"-"))max=Math.max(max,Number(id.slice(prefix.length+1))||0);}
 for(const record of records){
   if(!record.slug) throw new Error(`${file}: every record needs a stable slug.`);
   if(record.id){registry[record.slug]=record.id;continue;}
   if(registry[record.slug]) record.id=registry[record.slug];
   else {max++;record.id=`${prefix}-${String(max).padStart(4,"0")}`;registry[record.slug]=record.id;}
   changed=true;
 }
 fs.writeFileSync(file,JSON.stringify(records,null,2)+"\n");
}
if(changed)fs.writeFileSync(registryPath,JSON.stringify(registry,null,2)+"\n");
console.log("Record ID assignment complete.");
