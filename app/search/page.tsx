"use client";

import { Suspense, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Shell from "@/components/Shell";
import { getAllRecords } from "@/lib/data";

function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const query = q.toLowerCase().trim();
  const results = useMemo(() => getAllRecords().filter(r =>
    [r.name, r.id, r.description, r.classification, ...(r.tags || []),
     ...(r.abilities || []), ...((r.sections || []) as Array<{heading:string;body:string}>).map(s => s.heading + " " + s.body)
    ].join(" ").toLowerCase().includes(query)
  ), [query]);

  return <Shell><div className="page-heading">
    <div className="eyebrow">GLOBAL INDEX / SEARCH</div>
    <h1>Search results</h1>
    <p>Results across all Schokk Blitz databases.</p>
    <div className="heading-meta"><span>QUERY: {q || "—"}</span><span>{results.length} MATCHES</span></div>
  </div><div className="search-results">
    {results.map(r => <Link href={`/${r.category}/${r.slug}`} className="search-result" key={r.id}>
      <div><span className="record-id">{r.id} · {r.categoryTitle}</span><h3>{r.name}</h3><p>{r.description}</p></div>
      <span className="result-open">OPEN ↗</span>
    </Link>)}
    {!results.length && <div className="empty-state"><strong>No results found</strong><span>Try a different term or browse the database directory.</span></div>}
  </div></Shell>;
}

export default function SearchPage() {
  return <Suspense fallback={<div className="not-found">Loading search…</div>}><SearchResults /></Suspense>;
}
