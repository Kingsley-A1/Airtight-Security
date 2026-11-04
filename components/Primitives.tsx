import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { assessmentHref, type SectorId, type ServiceId } from "@/lib/content";
export const IMAGES = {
  hero:"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
  lobby:"https://images.unsplash.com/photo-1497366754035-f200968a6e72",
  people:"https://images.unsplash.com/photo-1557804506-669a67965ba0"
} as const;
export function Arrow({diagonal=false}:{diagonal?:boolean}){return <span aria-hidden="true" className="arrow">{diagonal?"↗":"→"}</span>}
export function Kicker({children,light=false}:{children:ReactNode;light?:boolean}){return <p className={light?"kicker kicker-light":"kicker"}><span className="kicker-line"/>{children}</p>}
export function SectionIntro({eyebrow,title,body,light=false}:{eyebrow:string;title:string;body?:string;light?:boolean}){return <div className="section-intro"><Kicker light={light}>{eyebrow}</Kicker><h2>{title}</h2>{body&&<p className="lead">{body}</p>}</div>}
export function CTA({children="Request a security assessment",service,sector,light=false}:{children?:ReactNode;service?:ServiceId;sector?:SectorId;light?:boolean}){return <Link className={light?"btn btn-light":"btn btn-primary"} href={assessmentHref(service,sector)}>{children}<Arrow diagonal/></Link>}
export function Photo({src,alt,priority=false,className="",sizes="(max-width: 768px) 100vw, 50vw"}:{src:string;alt:string;priority?:boolean;className?:string;sizes?:string}){return <div className={"photo "+className}><Image src={src} alt={alt} fill sizes={sizes} priority={priority} quality={78}/></div>}
export function PageHero({eyebrow,title,body,aside}:{eyebrow:string;title:string;body:string;aside?:ReactNode}){return <section className="page-hero"><div className="container"><div className="page-hero-grid"><div><Kicker>{eyebrow}</Kicker><h1>{title}</h1><p className="page-hero-body">{body}</p></div>{aside&&<div className="page-hero-aside">{aside}</div>}</div></div></section>}
export function Callout({eyebrow,title,body,service,sector}:{eyebrow?:string;title:string;body:string;service?:ServiceId;sector?:SectorId}){return <section className="section"><div className="container"><div className="callout"><div><Kicker light>{eyebrow??"Start with a clearer plan"}</Kicker><h2>{title}</h2><p>{body}</p></div><CTA service={service} sector={sector}/></div></div></section>}
export function FAQ({items}:{items:{q:string;a:string}[]}){return <div className="faqs">{items.map((item,i)=><details key={item.q} className="faq" open={i===0}><summary><span>{item.q}</span><span aria-hidden="true" className="faq-plus">+</span></summary><div className="faq-answer">{item.a}</div></details>)}</div>}

