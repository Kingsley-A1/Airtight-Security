"use client";
import {useEffect,useRef,useState,type FormEvent} from "react";
import {services,sectors,serviceLabel,sectorLabel,type ServiceId,type SectorId} from "@/lib/content";
import {validateAssessment,type AssessmentFields,type AssessmentErrors} from "@/lib/validation";
import {Arrow} from "@/components/Primitives";
export function AssessmentForm({initialService,initialSector}:{initialService:ServiceId;initialSector:SectorId|""}){
 const [values,setValues]=useState<AssessmentFields>({service:initialService,sector:initialSector,area:"",name:"",email:"",phone:"",organization:"",context:""});
 const [errors,setErrors]=useState<AssessmentErrors>({});
 const [pending,setPending]=useState(false);
 const [complete,setComplete]=useState(false);
 const pendingGuard=useRef(false);
 const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const errorRef=useRef<HTMLDivElement>(null);
 const successRef=useRef<HTMLHeadingElement>(null);
 const [submitAttempt,setSubmitAttempt]=useState(0);
 useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current)},[]);
 useEffect(()=>{if(submitAttempt>0&&Object.keys(errors).length)errorRef.current?.focus()},[submitAttempt,errors]);
 useEffect(()=>{if(complete)successRef.current?.focus()},[complete]);
 const setField=<K extends keyof AssessmentFields>(field:K,value:AssessmentFields[K])=>{setValues(prev=>({...prev,[field]:value}));setErrors(prev=>{if(!prev[field])return prev;const next={...prev};delete next[field];return next})};
 function submit(e:FormEvent<HTMLFormElement>){
   e.preventDefault();
   if(pendingGuard.current||complete)return;
   const result=validateAssessment(values);
   setErrors(result);setSubmitAttempt(x=>x+1);
   if(Object.keys(result).length)return;
   pendingGuard.current=true;setPending(true);
   // Deliberate local-only simulation. No fetch, server action, analytics, storage or email.
   timer.current=setTimeout(()=>{setPending(false);setComplete(true);pendingGuard.current=false;timer.current=null},380);
 }
 function restart(){if(timer.current)clearTimeout(timer.current);pendingGuard.current=false;setPending(false);setErrors({});setSubmitAttempt(0);setComplete(false);setValues({service:initialService,sector:initialSector,area:"",name:"",email:"",phone:"",organization:"",context:""})}
 if(complete) return <section className="confirmation" aria-live="polite"><span className="confirmation-icon" aria-hidden="true">✓</span><h2 tabIndex={-1} ref={successRef}>Demo request complete—no enquiry has been sent.</h2><p>You have finished the Airtight concept journey. The information stayed in this browser session only: no contact was made, no data was stored and no appointment was booked.</p><p><strong>Your selections:</strong> {serviceLabel(values.service)}{values.sector?" / "+sectorLabel(values.sector):""}.</p><button className="btn btn-primary" type="button" onClick={restart}>Start another demonstration <Arrow diagonal/></button></section>;
 return <form className="form-panel" onSubmit={submit} noValidate aria-label="Security assessment demonstration form">
  <div className="demo-note"><strong>Interactive demonstration.</strong> This form validates locally in your browser. It will not send, save or share your information. Please use fictional sample contact details.</div>
  {Object.keys(errors).length>0&&<div className="form-errors" role="alert" tabIndex={-1} ref={errorRef}><strong>Please check the highlighted fields.</strong> Your entries are preserved; nothing has been sent.</div>}
  <fieldset style={{border:0,margin:0,padding:0,minWidth:0}} disabled={pending}><legend className="form-section-title">What needs protection?</legend><p className="form-hint">A little context helps shape a better starting point. <span aria-hidden="true">*</span> Required.</p>
    <div className="form-fields">
      <div className="field full"><label htmlFor="service">Service of interest *</label><select id="service" value={values.service} onChange={e=>setField("service",e.target.value as ServiceId)} aria-invalid={!!errors.service} aria-describedby={errors.service?"service-error":undefined}><option value="not-sure">Not sure yet</option>{services.map(s=><option value={s.id} key={s.id}>{s.title}</option>)}</select>{errors.service&&<span className="field-error" id="service-error">{errors.service}</span>}</div>
      <div className="field"><label htmlFor="sector">Environment (optional)</label><select id="sector" value={values.sector} onChange={e=>setField("sector",e.target.value as SectorId|"")} aria-invalid={!!errors.sector} aria-describedby={errors.sector?"sector-error":undefined}><option value="">Select environment</option>{sectors.map(s=><option key={s.id} value={s.id}>{s.title}</option>)}</select>{errors.sector&&<span className="field-error" id="sector-error">{errors.sector}</span>}</div>
      <div className="field"><label htmlFor="area">City or general area *</label><input id="area" value={values.area} onChange={e=>setField("area",e.target.value)} placeholder="e.g. Calabar" maxLength={101} autoComplete="address-level2" aria-invalid={!!errors.area} aria-describedby={errors.area?"area-error":undefined}/>{errors.area&&<span className="field-error" id="area-error">{errors.area}</span>}</div>
      <div className="field full"><label htmlFor="context">What is your main concern? (optional)</label><textarea id="context" value={values.context} onChange={e=>setField("context",e.target.value)} maxLength={601} placeholder="A general description is enough. Avoid sensitive site details." aria-invalid={!!errors.context} aria-describedby={errors.context?"context-error":"context-note"}/><span className="field-note" id="context-note">Do not include credentials, site diagrams, personnel rosters or specific vulnerabilities.</span>{errors.context&&<span className="field-error" id="context-error">{errors.context}</span>}</div>
    </div>
  </fieldset>
  <hr className="form-divider"/>
  <fieldset style={{border:0,margin:0,padding:0,minWidth:0}} disabled={pending}><legend className="form-section-title">How can we reach you?</legend><p className="form-hint">For the concept walkthrough, use fictional sample details. Email or phone is required, but not both.</p>
    <div className="form-fields">
      <div className="field full"><label htmlFor="name">Name *</label><input id="name" value={values.name} onChange={e=>setField("name",e.target.value)} autoComplete="name" maxLength={81} placeholder="Your name" aria-invalid={!!errors.name} aria-describedby={errors.name?"name-error":undefined}/>{errors.name&&<span id="name-error" className="field-error">{errors.name}</span>}</div>
      <div className="field"><label htmlFor="email">Email address</label><input id="email" type="email" inputMode="email" autoComplete="email" value={values.email} onChange={e=>setField("email",e.target.value)} maxLength={255} placeholder="name@example.com" aria-invalid={!!errors.email} aria-describedby={errors.email?"email-error":undefined}/>{errors.email&&<span id="email-error" className="field-error">{errors.email}</span>}</div>
      <div className="field"><label htmlFor="phone">Phone number</label><input id="phone" type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={e=>setField("phone",e.target.value)} maxLength={25} placeholder="+234 ..." aria-invalid={!!errors.phone} aria-describedby={errors.phone?"phone-error":undefined}/>{errors.phone&&<span id="phone-error" className="field-error">{errors.phone}</span>}</div>
      <div className="field full"><label htmlFor="organization">Organization (optional)</label><input id="organization" value={values.organization} onChange={e=>setField("organization",e.target.value)} maxLength={101} autoComplete="organization" placeholder="Organization or property name" aria-invalid={!!errors.organization} aria-describedby={errors.organization?"org-error":undefined}/>{errors.organization&&<span id="org-error" className="field-error">{errors.organization}</span>}</div>
    </div>
  </fieldset>
  <div className="form-bottom"><p>Completing this demonstration does not contact a business, create a lead or schedule an assessment.</p><button type="submit" className="btn btn-primary" disabled={pending} aria-busy={pending}>{pending?"Checking locally…":"Complete demo request"}{!pending&&<Arrow diagonal/>}</button></div>
 </form>
}

