import { siteConfig, getRecordCount } from "@/lib/data";
export default function Footer(){return <footer className="footer"><span>© {new Date().getFullYear()} {siteConfig.organization} · SCHOKK BLITZ DATABASE</span><span>DATABASE VERSION {siteConfig.version} · {getRecordCount()} SAMPLE RECORDS</span></footer>}
