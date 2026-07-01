import { test as setup } from "@playwright/test";
import path from "node:path";

import { LoginPage } from "../pages/LoginPage.js";

const authFile = path.join(process.cwd(), "playwright/.auth/user.json");

setup("authenticate", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.login();

  await page.context().storageState({
    path: authFile,
  });
});
