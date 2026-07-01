import { expect, type Locator, type Page } from "@playwright/test";

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(path = "") {
    await this.page.goto(path);
  }

  async click(locator: Locator) {
    await locator.click();
  }

  async fill(locator: Locator, value: string) {
    await locator.fill(value);
  }

  async expectVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }
}
