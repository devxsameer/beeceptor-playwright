import { type Locator, type Page } from "@playwright/test";

import { EndpointDashboardPage } from "./EndpointDashboardPage.js";
import { env } from "../config/env.js";

export class EndpointsPage {
  constructor(private readonly page: Page) {}

  private get createFreeButton() {
    return this.page.getByRole("link", {
      name: /create free/i,
    });
  }

  private get endpointInput() {
    return this.page.getByRole("textbox");
  }

  private get createMockServerButton() {
    return this.page.getByRole("button", {
      name: /create mock server/i,
    });
  }

  private endpointRow(name: string): Locator {
    return this.page.getByRole("link", {
      name: new RegExp(name, "i"),
    });
  }

  private get emptyState() {
    return this.page.getByText(/you have not created any endpoint yet/i);
  }

  async hasEndpoint(name: string) {
    await this.page.goto("/endpoints");

    if (await this.emptyState.isVisible().catch(() => false)) {
      return false;
    }

    return this.endpointRow(name)
      .isVisible()
      .catch(() => false);
  }

  async createEndpoint(name: string) {
    await this.page.goto("/endpoints");

    if (await this.emptyState.isVisible().catch(() => false)) {
      await this.createFreeButton.click();
    } else {
      await this.page.goto("/");
    }

    await this.endpointInput.fill(name);

    await this.createMockServerButton.click();

    const dashboard = new EndpointDashboardPage(this.page);

    await dashboard.assertLoaded(name);

    return dashboard;
  }

  async openEndpoint(name: string) {
    await this.page.goto("/endpoints");

    await this.endpointRow(name).click();

    const dashboard = new EndpointDashboardPage(this.page);

    await dashboard.assertLoaded(name);

    return dashboard;
  }

  async ensureEndpoint() {
    const name = env.endpointName;
    const exists = await this.hasEndpoint(name);

    if (exists) {
      return this.openEndpoint(name);
    }

    return this.createEndpoint(name);
  }
}
