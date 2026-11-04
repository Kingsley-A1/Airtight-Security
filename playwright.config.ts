import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./e2e",
  timeout: 30000,
  use: { baseURL: "http://127.0.0.1:3000", trace: "retain-on-failure" },
  webServer: { command: "npm run start", url: "http://127.0.0.1:3000", reuseExistingServer: !process.env.CI, timeout: 120000 },
  projects: [
    { name: "desktop-chromium", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobile-chromium", use: { ...devices["Pixel 5"], viewport: { width: 390, height: 844 } } }
  ],
  reporter: [["list"], ["html", { open: "never" }]]
});