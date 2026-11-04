import type {Metadata} from "next";
import {AssessmentForm} from "@/components/AssessmentForm";
import {Kicker,PageHero} from "@/components/Primitives";
import {allowedService,allowedSector} from "@/lib/validation";
export const metadata:Metadata={title:"Security assessment demo",description:"Try the Airtight Security assessment journey. This is a browser-only demonstration: no details are transmitted, stored or sent to a company."};
type Params={service?:string|string[];sector?:string|string[]};
export default async function Contact({searchParams}:{searchParams:Promise<Params>}){
 const p=await searchParams;
 const service=allowedService(p.service);
 const sector=allowedSector(p.sector);
 return <><PageHero eyebrow="Contact / assessment demonstration" title="Start with a clearer understanding of your site." body="Tell us what kind of environment you are exploring. This short concept experience shows how an enquiry could begin—without sending any information." aside={<><strong>No live business contact.</strong>The form is a demonstration only. An actual security provider would need verified contact channels, response ownership and secure submission infrastructure.</>}/><section className="section"><div className="container contact-grid"><AssessmentForm initialService={service} initialSector={sector}/><aside className="contact-aside"><Kicker>What to expect</Kicker><h2>Clarity from the first step.</h2><p>For a real security service, the first conversation should establish what needs protecting and whether an assessment is appropriate—not assume the solution in advance.</p><ol><li><b>01</b><span>Identify the environment and primary concern.</span></li><li><b>02</b><span>Discuss what protections and processes are already in place.</span></li><li><b>03</b><span>Agree next steps only after a qualified person reviews the needs.</span></li></ol><p className="note" style={{marginTop:30}}>This website has no staffed response channel. No emergency requests can be submitted.</p></aside></div></section></>;
}

