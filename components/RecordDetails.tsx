import Image from "next/image";
import Link from "next/link";
import type { RecordItem } from "@/lib/types";
import { findRecordById } from "@/lib/data";
import { publicAsset } from "@/lib/paths";
function Panel({title,children}:{title:string;children:React.ReactNode}){return <section className="detail-panel"><div className="panel-heading">{title}</div><div className="panel-content">{children}</div></section>}
export default function RecordDetails({record,categoryTitle}:{record:RecordItem;categoryTitle:string}) {
 const related=(record.relatedRecords||[]).map(findRecordById).filter(Boolean);
 const stats=(record.stats||record.specifications||[]) as Array<{label:string;value:string}>;
 return <div className="record-detail">
  <div className="detail-hero"><div className="detail-art"><Image src={publicAsset(record.image)} alt="" fill sizes="(max-width:800px) 100vw, 420px"/></div><div className="detail-intro"><div className="eyebrow">{categoryTitle.toUpperCase()} / {record.id}</div><h1>{record.name}</h1><div className="detail-meta"><span>{record.classification||"Unclassified"}</span><span>{record.status||"DATABASE RECORD"}</span></div><p>{record.description}</p><div className="tag-row">{(record.tags||[]).map(t=><span key={t}>{t}</span>)}</div></div></div>
  {stats.length>0&&<Panel title="SPECIFICATIONS"><div className="stat-grid">{stats.map(s=><div className="stat-cell" key={s.label}><small>{s.label}</small><strong>{s.value}</strong></div>)}</div></Panel>}
  {!!record.upgrades?.length&&<Panel title="UPGRADE PROGRESSION"><div className="table-scroll"><table><thead><tr>{Object.keys(record.upgrades[0]).map(k=><th key={k}>{k}</th>)}</tr></thead><tbody>{record.upgrades.map((u,i)=><tr key={i}>{Object.values(u).map((v,j)=><td key={j}>{v}</td>)}</tr>)}</tbody></table></div></Panel>}
  {!!record.abilities?.length&&<Panel title="ABILITIES & BEHAVIOR"><ul className="clean-list">{record.abilities.map(x=><li key={x}>{x}</li>)}</ul></Panel>}
  {!!record.sections?.length&&<Panel title="DOCUMENTATION"><div className="prose-sections">{record.sections.map(s=><div key={s.heading}><h3>{s.heading}</h3><p>{s.body}</p></div>)}</div></Panel>}
  {!!record.features?.length&&<Panel title="MAP FEATURES"><ul className="clean-list">{record.features.map(x=><li key={x}>{x}</li>)}</ul></Panel>}
  {!!record.strengths?.length&&<Panel title="STRENGTHS & LIMITATIONS"><div className="two-col"><div><h3>Strengths</h3><ul className="clean-list">{record.strengths.map(x=><li key={x}>{x}</li>)}</ul></div><div><h3>Weaknesses</h3><ul className="clean-list">{(record.weaknesses||[]).map(x=><li key={x}>{x}</li>)}</ul></div></div></Panel>}
  {!!record.relatedRecords?.length&&<Panel title="RELATED RECORDS"><div className="related-list">{related.map(r=><Link key={r!.id} href={`/${(r as any).category}/${r!.slug}`}><span><strong>{r!.name}</strong><small>{r!.id}</small></span><span>OPEN RECORD ↗</span></Link>)}{related.length===0&&<p>No linked records have been added yet.</p>}</div></Panel>}
  <div className="record-footnote">RECORD {record.id} · LAST UPDATED {record.lastUpdated||"NOT RECORDED"} · Verify all mock information against the game.</div>
 </div>;
}
