import { expect, type Locator, type Page } from "@playwright/test";

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(path = "") {
    await this.page.goto(path);
  }
}
