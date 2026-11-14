import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/data";
import { publicAsset } from "@/lib/paths";
export const metadata: Metadata = { title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` }, description: siteConfig.description, icons: { icon: publicAsset("/images/branding/favicon.svg") } };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
