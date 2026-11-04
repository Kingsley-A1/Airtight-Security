# Airtight Security — concept website

A seven-route premium security-services concept built for **Bespoke Technologies**.

**Creative thesis:** Every layer. Working together.  
**Status:** Demonstration, not an operating or licensed security company.

## Architecture

Next.js 16 App Router, React 19, TypeScript and Tailwind CSS 4. Public pages are server-rendered; only the header navigation and assessment flow require client-side JavaScript. Service data, sector data, FAQs and approach stages are centralized in lib/content.ts.

There is no API route, server action, database, CMS, chatbot, analytics, cookies, email sending, localStorage or remote form submission. Form values exist only in React component memory.

## Pages

- Home /
- Solutions /solutions
- On-site guarding /solutions/on-site-guarding
- Sectors /sectors
- Commercial premises /sectors/commercial-premises
- About /about
- Assessment demo /contact

The connected journey is Home → Commercial premises → On-site guarding → Assessment demo → browser-only confirmation. URL parameter validation discards unknown service and sector identifiers. Both selections are editable before demonstration submission.

The exact successful state is: **Demo request complete—no enquiry has been sent.**

## Local commands

Node.js 22+ and npm are required.

1. npm ci
2. npm run dev
3. npm test
4. npm run typecheck
5. npm run lint
6. npm run build
7. npx playwright install chromium
8. npm run test:e2e (after building)

The browser test suite exercises the seven direct routes, the full assessment journey, absence of POSTs, invalid parameters, mobile keyboard behavior and desktop/mobile screenshot capture.

## Visual asset register

All images are representative stock photography, not Airtight personnel, facilities, clients or deployments. The photographs are served through Next.js image optimization:

- Hero commercial architecture: https://images.unsplash.com/photo-1486406146926-c627a92ad1ab
- Workplace glass-partition corridor: https://images.unsplash.com/photo-1497366754035-f200968a6e72
- Colleagues reviewing a working plan: https://images.unsplash.com/photo-1557804506-669a67965ba0

Stock-image license guidance: https://unsplash.com/license . The original source record and exact usage rights should be reconfirmed before a real commercial launch. No competitor logos, wording or proprietary design assets were copied. Airtight is represented with typographic brand text, not a fabricated official logo.

## SEO and access status

Sitewide metadata and HTTP headers specify noindex, nofollow and noarchive; robots.txt disallows crawling. Indexing directives are **not** access control. An authenticated Vercel preview may require the host's supported deployment-sharing link; do not weaken account-wide protections.

A sitemap and canonical public domain have intentionally not been fabricated for a concept. Add them once a verified production domain exists.

## Content maintenance

Update lib/content.ts for service details, boundaries, sectors, FAQs and the four-step approach. Review all editorial page copy after any changes to operating scope. Keep IDs stable or update the assessment links and tests together.

## Production migration

Do not represent this concept as an operating business until the following are completed:

1. Verify Airtight's legal and licensing status, service geography, actual operating hours, permissions, insurance, personnel, coverage capacity and allowed claims.
2. Replace provisional services and scenarios with approved operating statements and verifiable proof. Add a real identity, verified contacts and company-managed image assets.
3. Agree site assessment methodology, assignment boundaries, shift coverage and relief, actual supervision, escalation and equipment/incident response obligations.
4. Build an actual server-side submission boundary with typed validation, rate limits, abuse controls, privacy notice, minimal durable record, retention and deletion policy and secure logs.
5. Assign each incoming lead to an accountable owner; use idempotent receipts, reliable notifications with failure queues, follow-up states and monitoring. Show success only after durable storage, not when notification is attempted.
6. Establish realistic staffed response windows, client escalation routes and an appropriate real emergency-handling policy. Never present a general sales form as an emergency dispatch line.
7. Verify accessibility with screen-reader and keyboard testing, browser/mobile QA, image rights, security review, Core Web Vitals from real users, canonical sitemap and lawful privacy disclosures before enabling indexing.

## Source brief

Airtight_Security_Website_Research_and_Plan, Bespoke Technologies, 2 November 2026. The accepted seven-route scope and coordinate-protection narrative are implemented as a single buyer journey.
