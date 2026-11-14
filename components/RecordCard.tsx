import Link from "next/link";
import Image from "next/image";
import type { RecordItem } from "@/lib/types";
import { publicAsset } from "@/lib/paths";
export default function RecordCard({record,category}:{record:RecordItem & {category:string};category:string}) {
 return <Link href={`/${category}/${record.slug}`} className="record-card">
  <div className="record-image"><Image src={publicAsset(record.image)} alt="" fill sizes="(max-width: 700px) 90vw, (max-width: 1100px) 40vw, 260px" /></div>
  <div className="record-card-body"><div className="record-card-top"><span className="record-id">{record.id}</span><span className="record-status">{record.status||"DATABASE RECORD"}</span></div><h3>{record.name}</h3><p>{record.description}</p><div className="tag-row">{(record.tags||[]).slice(0,3).map(tag=><span key={tag}>{tag}</span>)}</div></div>
 </Link>;
}
