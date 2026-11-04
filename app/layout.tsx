import type { Metadata, Viewport } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";
export const metadata: Metadata = {
 title:{default:"Airtight Security | Every layer. Working together.",template:"%s | Airtight Security"},
 description:"Explore a proposed coordinated security approach bringing people, surveillance, access control and oversight together. Airtight Security is a concept demonstration.",
 robots:{index:false,follow:false,noarchive:true},
 applicationName:"Airtight Security",
 openGraph:{title:"Airtight Security | Every layer. Working together.",description:"An integrated security-services concept by Bespoke Technologies.",type:"website"}
};
export const viewport:Viewport={width:"device-width",initialScale:1,themeColor:"#FFFFFF"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to main content</a><SiteHeader/><main id="main-content">{children}</main><SiteFooter/></body></html>}

