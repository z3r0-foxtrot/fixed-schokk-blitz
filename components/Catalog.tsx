"use client";
import { useMemo, useState } from "react";
import { LayoutGrid, List, Search, ArrowUpDown } from "lucide-react";
import RecordCard from "./RecordCard";
import type { RecordItem } from "@/lib/types";
export default function Catalog({records,category}:{records:RecordItem[];category:string}) {
 const [query,setQuery]=useState(""); const [view,setView]=useState<"grid"|"list">("grid"); const [sort,setSort]=useState("name");
 const filtered=useMemo(()=>records.filter(r=>[r.name,r.id,r.description,r.classification,...(r.tags||[])].join(" ").toLowerCase().includes(query.toLowerCase())).sort((a,b)=>sort==="id"?a.id.localeCompare(b.id):a.name.localeCompare(b.name)),[records,query,sort]);
 return <div className="catalog"><div className="catalog-tools"><label className="catalog-search"><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Filter this database..."/></label><div className="tool-actions"><label className="sort-select"><ArrowUpDown size={15}/><select value={sort} onChange={e=>setSort(e.target.value)}><option value="name">Name A–Z</option><option value="id">Record ID</option></select></label><button className={view==="grid"?"view-btn selected":"view-btn"} onClick={()=>setView("grid")} aria-label="Grid view"><LayoutGrid size={17}/></button><button className={view==="list"?"view-btn selected":"view-btn"} onClick={()=>setView("list")} aria-label="List view"><List size={17}/></button></div></div>
 <div className={view==="grid"?"record-grid":"record-list"}>{filtered.map(r=><RecordCard key={r.id} record={r as RecordItem & {category:string}} category={category}/>)}</div>
 {!filtered.length&&<div className="empty-state"><Search size={25}/><strong>No records found</strong><span>Try another search term.</span></div>}
 <div className="results-count">DISPLAYING {filtered.length} OF {records.length} RECORDS</div></div>;
}
