import { notFound } from "next/navigation";
import Shell from "@/components/Shell";
import Catalog from "@/components/Catalog";
import { categories, getRecords } from "@/lib/data";
export function generateStaticParams(){return categories.map(c=>({category:c.key}))}
export default async function CategoryPage({params}:{params:Promise<{category:string}>}) {
 const {category}=await params; const meta=categories.find(c=>c.key===category); if(!meta)notFound();
 const records=getRecords(meta.key);
 return <Shell active={meta.key}><div className="page-heading"><div className="eyebrow">DATABASE DIRECTORY / {meta.prefix}</div><h1>{meta.title}</h1><p>{meta.description}</p><div className="heading-meta"><span>{records.length} SAMPLE RECORDS</span><span>PUBLIC DATABASE</span></div></div><Catalog records={records} category={meta.key}/></Shell>
}
