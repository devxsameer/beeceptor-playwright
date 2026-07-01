import { expect, type Page } from "@playwright/test";

export class EndpointDashboardPage {
  constructor(private readonly page: Page) {}

  async assertLoaded(endpointName: string) {
    await expect(this.page).toHaveURL(new RegExp(`/console/${endpointName}$`));

    await expect(this.page.getByText("Ready and waiting!")).toBeVisible();
  }

  get url() {
    return this.page.url();
  }
}
