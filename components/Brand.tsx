import Link from "next/link";
import { Database } from "lucide-react";
import { siteConfig } from "@/lib/data";
export default function Brand() {
  return <Link href="/" className="brand">
    <span className="brand-mark"><Database size={21}/></span>
    <span className="brand-copy"><strong>{siteConfig.organization}</strong><small>INFORMATION SYSTEMS</small></span>
  </Link>;
}
