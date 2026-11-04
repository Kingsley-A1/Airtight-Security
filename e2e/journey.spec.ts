import { test, expect } from "@playwright/test";
import fs from "node:fs";
const routes = ["/","/solutions","/solutions/on-site-guarding","/sectors","/sectors/commercial-premises","/about","/contact"];
test("all seven pages load directly", async ({ page }) => {
  for (const path of routes) {
    const result = await page.goto(path);
    expect(result?.ok()).toBeTruthy();
    await expect(page.locator("main h1")).toBeVisible();
  }
});
test("commercial-to-guarding-to-assessment journey retains context and sends no data", async ({ page }) => {
  const posts: string[] = [];
  page.on("request", request => { if (request.method() === "POST") posts.push(request.url()); });
  await page.goto("/");
  await page.getByRole("link",{name:/Commercial premises/}).first().click();
  await expect(page).toHaveURL(/sectors\/commercial-premises/);
  await page.getByRole("link",{name:/See complete service detail/}).click();
  await expect(page).toHaveURL(/on-site-guarding\?sector=commercial-premises/);
  await page.locator('a[href*="/contact?service=on-site-guarding"]').first().click();
  await expect(page.locator("#service")).toHaveValue("on-site-guarding");
  await expect(page.locator("#sector")).toHaveValue("commercial-premises");
  await page.getByRole("button",{name:/Complete demo request/}).click();
  await expect(page.locator(".form-errors")).toContainText("highlighted fields");
  await page.locator("#area").fill("Calabar");
  await page.locator("#name").fill("Example Visitor");
  await page.locator("#email").fill("demo@example.com");
  await page.getByRole("button",{name:/Complete demo request/}).click();
  await expect(page.getByRole("heading",{name:"Demo request complete—no enquiry has been sent."})).toBeVisible();
  expect(posts).toEqual([]);
  await page.getByRole("button",{name:/Start another demonstration/}).click();
  await expect(page.locator("#sector")).toHaveValue("commercial-premises");
});
test("invalid query values fall back safely", async ({ page }) => {
  await page.goto("/contact?service=invalid&sector=bad");
  await expect(page.locator("#service")).toHaveValue("not-sure");
  await expect(page.locator("#sector")).toHaveValue("");
});
test("mobile navigation supports keyboard closure", async ({ page, isMobile }) => {
  if (!isMobile) return;
  await page.goto("/");
  await page.getByRole("button",{name:"Open navigation"}).click();
  await expect(page.getByRole("navigation",{name:"Mobile navigation"})).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button",{name:"Open navigation"})).toHaveAttribute("aria-expanded","false");
});
test("capture desktop and mobile visual evidence", async ({ page, isMobile }) => {
  fs.mkdirSync("artifacts",{recursive:true});
  await page.goto("/");
  await page.screenshot({path:isMobile?"artifacts/home-mobile.png":"artifacts/home-desktop.png",fullPage:true});
  await page.goto("/contact?service=on-site-guarding&sector=commercial-premises");
  await page.screenshot({path:isMobile?"artifacts/contact-mobile.png":"artifacts/contact-desktop.png",fullPage:true});
});
test("layouts do not overflow at 360, 390, 768 and 1440 CSS pixels",async ({page})=>{
  for(const width of [360,390,768,1440]){
    await page.setViewportSize({width,height:900});
    for(const path of ["/","/solutions","/sectors","/contact"]){
      await page.goto(path);
      const dimensions=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,innerWidth:window.innerWidth}));
      expect(dimensions.scrollWidth, `overflow at ${width}px on ${path}`).toBeLessThanOrEqual(dimensions.innerWidth+1);
    }
  }
});
test("reduced-motion preference disables animated scrolling",async ({page})=>{
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.goto("/");
  expect(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
});

test("representative images load when they enter the viewport",async ({page})=>{
  await page.goto("/");
  const photos=page.locator("main .photo img");
  await expect(photos).toHaveCount(3);
  for(let i=0;i<3;i++){
    const img=photos.nth(i);
    await img.scrollIntoViewIfNeeded();
    await expect.poll(async()=>img.evaluate(el=>el instanceof HTMLImageElement && el.complete && el.naturalWidth>0),{timeout:20000}).toBe(true);
  }
});
test("no uncaught client errors during main buyer journey",async ({page})=>{
  const errors:string[]=[];
  page.on("pageerror",err=>errors.push(err.message));
  await page.goto("/");
  await page.goto("/sectors/commercial-premises");
  await page.goto("/solutions/on-site-guarding?sector=commercial-premises");
  await page.goto("/contact?service=on-site-guarding&sector=commercial-premises");
  expect(errors).toEqual([]);
});
test("200 percent text enlargement retains content within the reading viewport",async ({page})=>{
  await page.setViewportSize({width:768,height:900});
  for(const path of ["/","/contact"]){
    await page.goto(path);
    await page.evaluate(()=>{document.documentElement.style.fontSize="32px"});
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
    expect(overflow, `text zoom overflow on ${path}`).toBeLessThanOrEqual(1);
  }
});
