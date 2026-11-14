import Link from "next/link";
import { ArrowUpRight, Database, FileClock, Layers3, ShieldCheck } from "lucide-react";
import Shell from "@/components/Shell";
import SearchBox from "@/components/SearchBox";
import RecordCard from "@/components/RecordCard";
import { categories, getAllRecords, getRecords, getRecordCount, siteConfig } from "@/lib/data";
const icons:Record<string,string>={towers:"◈",enemies:"⌖",maps:"▧",equipment:"◇",lore:"▤",mechanics:"⚙",guides:"≡",updates:"↻"};
export default function Home(){
 const featured=[...getRecords("towers").slice(0,1),...getRecords("enemies").slice(0,1),...getRecords("maps").slice(0,1)];
 return <Shell><div className="home-page">
  <div className="hero-banner"><div className="hero-grid-pattern"/><div className="hero-content"><div className="eyebrow"><span className="status-dot"/> SCHOKK INDUSTRY / CENTRAL INFORMATION SYSTEM</div><h1>Schokk Blitz<br/><em>Database</em></h1><p>A centralized reference system for game units, battlefields, equipment, mechanics, and official documentation.</p><div className="hero-search"><SearchBox/></div><div className="hero-foot"><span><ShieldCheck size={14}/> PUBLIC REFERENCE ACCESS</span><span><Database size={14}/> {getRecordCount()} SAMPLE RECORDS LOADED</span></div></div><div className="hero-watermark">SI</div></div>
  <div className="section-heading"><div><div className="eyebrow">DATABASE DIRECTORY</div><h2>Browse information</h2><p>Select a database to explore its records and documentation.</p></div><span className="section-code">IDX / 08</span></div>
  <div className="category-grid">{categories.map(c=><Link href={`/${c.key}`} className="category-tile" key={c.key}><span className="category-symbol">{icons[c.key]}</span><div><h3>{c.title}</h3><p>{c.description}</p></div><ArrowUpRight size={17} className="tile-arrow"/></Link>)}</div>
  <div className="section-heading section-heading-spaced"><div><div className="eyebrow">DATABASE SPOTLIGHT</div><h2>Featured records</h2><p>Example records demonstrate the intended structure and presentation.</p></div><Link href="/towers" className="text-link">Browse all records <ArrowUpRight size={15}/></Link></div>
  <div className="record-grid">{featured.map(r=><RecordCard key={r.id} record={r as any} category={r.id.startsWith("TWR")?"towers":r.id.startsWith("ENM")?"enemies":"maps"}/>)}</div>
  <div className="home-bottom-grid"><div className="info-panel"><div className="panel-heading">DATABASE ACTIVITY</div><div className="activity-row"><FileClock size={17}/><span><strong>Latest content entry</strong><small>Mock records included for initial preview</small></span><b>01</b></div><div className="activity-row"><Layers3 size={17}/><span><strong>Database sections</strong><small>Eight independent content categories</small></span><b>08</b></div></div><div className="info-panel version-panel"><div className="eyebrow">SYSTEM INFORMATION</div><h3>{siteConfig.name}</h3><p>{siteConfig.description}</p><div className="version-line"><span>DATABASE BUILD</span><strong>{siteConfig.version}</strong></div><div className="version-line"><span>CONTENT MODE</span><strong>REPOSITORY MANAGED</strong></div></div></div>
 </div></Shell>
}
