import { expect, type Page } from "@playwright/test";
import { BasePage } from "./BasePage.js";
import { env } from "../config/env.js";

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  readonly signInButton = this.page.getByRole("link", {
    name: /sign in/i,
  });

  async login() {
    await this.goto("/login");
    await this.page.waitForLoadState("networkidle");

    const form = this.page.locator("form").first();
    await form
      .getByLabel(/username|Email address|Username or email address/i)
      .fill(env.email);
    await form.getByLabel(/password/i).fill(env.password);

    await form.getByText("Sign in").click();

    await expect(this.page).toHaveURL(/beeceptor\.com/);
  }
}
