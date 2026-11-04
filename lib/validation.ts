import { services, sectors, type ServiceId, type SectorId } from "./content.ts";
export type AssessmentFields={service:ServiceId;sector:SectorId|"";area:string;name:string;email:string;phone:string;organization:string;context:string};
export type AssessmentErrors=Partial<Record<keyof AssessmentFields,string>>;
export const allowedService=(value:unknown):ServiceId => typeof value==="string" && (value==="not-sure"||services.some(s=>s.id===value)) ? value as ServiceId : "not-sure";
export const allowedSector=(value:unknown):SectorId|"" => typeof value==="string" && sectors.some(s=>s.id===value) ? value as SectorId : "";
const emailValid=(s:string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s) && s.length<=254;
const phoneValid=(s:string) => {const cleaned=s.replace(/[\s().-]/g,"");return /^\+?\d{7,15}$/.test(cleaned)};
export function validateAssessment(v:AssessmentFields):AssessmentErrors {
 const e:AssessmentErrors={};
 if (!["not-sure",...services.map(s=>s.id)].includes(v.service)) e.service="Choose a valid service option.";
 if (v.sector && !sectors.some(s=>s.id===v.sector)) e.sector="Choose a listed environment.";
 if (v.area.trim().length<2||v.area.trim().length>100) e.area="Enter a city or general area (2–100 characters).";
 if (v.name.trim().length<2||v.name.trim().length>80) e.name="Enter your name (2–80 characters).";
 if (v.email.trim() && !emailValid(v.email.trim())) e.email="Enter a valid email address.";
 if (v.phone.trim() && !phoneValid(v.phone.trim())) e.phone="Enter a valid phone number with 7–15 digits.";
 if (!v.email.trim()&&!v.phone.trim()) {e.email="Provide an email address or a phone number.";e.phone="At least one contact method is required."}
 if (v.organization.trim().length>100) e.organization="Keep the organization name under 100 characters.";
 if (v.context.trim().length>600) e.context="Keep the brief context under 600 characters.";
 return e;
}

