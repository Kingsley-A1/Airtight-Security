import test from "node:test";
import assert from "node:assert/strict";
import { allowedService, allowedSector, validateAssessment } from "../lib/validation.ts";
const base={service:"on-site-guarding",sector:"commercial-premises",area:"Calabar",name:"Example Visitor",email:"demo@example.com",phone:"",organization:"",context:""};
test("accepts email-only demo fields and preserves selected context",()=>assert.deepEqual(validateAssessment(base),{}));
test("allows phone-only contact method",()=>assert.deepEqual(validateAssessment({...base,email:"",phone:"+234 802 000 0000"}),{}));
test("requires at least one valid contact",()=>{const e=validateAssessment({...base,email:"",phone:""});assert.ok(e.email);assert.ok(e.phone)});
test("rejects malformed contact values even when another method is valid",()=>{assert.ok(validateAssessment({...base,email:"demo",phone:"+2348020000000"}).email);assert.ok(validateAssessment({...base,phone:"abc"}).phone)});
test("handles invalid query parameters safely",()=>{assert.equal(allowedService("unexpected"),"not-sure");assert.equal(allowedSector("unexpected"),"");assert.equal(allowedService(["on-site-guarding"]),"not-sure")});
test("validates required area and name, rejects excess context",()=>{const e=validateAssessment({...base,area:"",name:"",context:"x".repeat(601)});assert.ok(e.area);assert.ok(e.name);assert.ok(e.context)});
test("rejects invalid forged selections",()=>{const e=validateAssessment({...base,service:"bad",sector:"bad"});assert.ok(e.service);assert.ok(e.sector)});

