import Link from "next/link";
import { Activity, BookOpen, Boxes, Crosshair, FileText, Map, Package, Shield, SlidersHorizontal } from "lucide-react";
import { categories } from "@/lib/data";
const icons = [Shield,Crosshair,Map,Package,BookOpen,SlidersHorizontal,FileText,Activity];
export default function Sidebar({active}:{active?:string}) {
 return <aside className="sidebar"><div className="side-label">DATABASE DIRECTORY</div>
  <Link href="/" className={`side-link ${!active?"active":""}`}><Boxes size={16}/> Overview</Link>
  {categories.map((c,i)=>{const Icon=icons[i];return <Link key={c.key} href={`/${c.key}`} className={`side-link ${active===c.key?"active":""}`}><Icon size={16}/>{c.title}</Link>})}
  <div className="sidebar-bottom"><div className="side-label">SYSTEM INFORMATION</div><div className="system-note"><span className="status-dot"/> Repository content<br/><small>Public reference access</small></div></div>
 </aside>;
}
