"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";
import { getAllRecords } from "@/lib/data";
export default function SearchBox({compact=false}:{compact?:boolean}) {
 const [query,setQuery]=useState(""); const router=useRouter();
 const results=useMemo(()=>{const q=query.trim().toLowerCase();if(q.length<2)return [];return getAllRecords().filter(r=>[r.name,r.id,r.description,r.classification,...(r.tags||[]),...(r.abilities||[])].join(" ").toLowerCase().includes(q)).slice(0,6)},[query]);
 function submit(e:React.FormEvent){e.preventDefault();if(query.trim())router.push(`/search?q=${encodeURIComponent(query.trim())}`)}
 return <div className={`search-wrap ${compact?"compact":""}`}><form className="search-form" onSubmit={submit}><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search towers, enemies, maps, mechanics..." aria-label="Search the entire database"/><kbd>ENTER</kbd></form>
 {query.trim().length>=2&&<div className="search-suggestions">{results.length?results.map(r=><button key={r.id} onClick={()=>router.push(`/${r.category}/${r.slug}`)}><span><strong>{r.name}</strong><small>{r.id} · {r.categoryTitle}</small></span><ArrowRight size={15}/></button>):<p>No matching records. Press Enter to view all results.</p>}</div>}
 </div>;
}
