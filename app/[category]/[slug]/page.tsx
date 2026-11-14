import { notFound } from "next/navigation";
import Link from "next/link";
import Shell from "@/components/Shell";
import RecordDetails from "@/components/RecordDetails";
import { categories, getRecords, getRecord } from "@/lib/data";
export function generateStaticParams(){return categories.flatMap(c=>getRecords(c.key).map(r=>({category:c.key,slug:r.slug})))}
export default async function RecordPage({params}:{params:Promise<{category:string;slug:string}>}) {
 const {category,slug}=await params; const meta=categories.find(c=>c.key===category); const record=getRecord(category,slug); if(!meta||!record)notFound();
 return <Shell active={category}><div className="breadcrumb"><Link href={`/${category}`}>{meta.title}</Link><span>/</span><span>{record.name}</span></div><RecordDetails record={record} categoryTitle={meta.title}/></Shell>
}
