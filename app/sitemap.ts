import type { MetadataRoute } from "next";
const paths=["/","/solutions","/solutions/on-site-guarding","/sectors","/sectors/commercial-premises","/about","/contact"];
export default function sitemap(): MetadataRoute.Sitemap { return paths.map(path=>({url:"https://airtight-security.example"+path,changeFrequency:"monthly",priority:path==="/"?1:0.6})); }
