import { expect, type Page } from "@playwright/test";

export interface HttpCalloutConfig {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

  path: string;

  targetEndpoint: string;

  responseBehaviour: "sync" | "async";

  payloadMode: "forward" | "custom";

  triggerDelay?: number;

  description?: string;

  forwardHeaders?: boolean;

  forwardPayload?: boolean;
}

export class EndpointDashboardPage {
  constructor(private readonly page: Page) {}

  async assertLoaded(endpointName: string) {
    await expect(this.page).toHaveURL(new RegExp(`/console/${endpointName}$`));

    await expect(this.page.getByText("Ready and waiting!")).toBeVisible();
  }

  get url() {
    return this.page.url();
  }
  private get rulesModal() {
    return this.page.locator(".allRules");
  }

  async openMockRules() {
    const mockRules = this.page.getByText(/^Mock Rules \(\d+\)$/).first();

    await expect(mockRules).toBeVisible();
    await mockRules.click();

    await expect(this.rulesModal).toBeVisible();
  }
  private async hasRule(path: string) {
    const modal = this.rulesModal;

    return modal
      .locator("code")
      .filter({
        hasText: path,
      })
      .first()
      .isVisible()
      .catch(() => false);
  }

  public async createHttpCalloutRule(config: HttpCalloutConfig) {
    await this.openMockRules();

    if (await this.hasRule(config.path)) {
      await this.closeRulesModal();
      return;
    }

    await this.openNewCalloutForm();

    await this.fillCalloutForm(config);

    await this.saveCalloutRule();

    await expect(
      this.rulesModal.getByText(
        new RegExp(`${config.method}\\s*${config.path}`, "i"),
      ),
    ).toBeVisible();

    await this.closeRulesModal();
  }

  private async openNewCalloutForm() {
    const modal = this.rulesModal;

    await modal.getByRole("button", { name: "Toggle Dropdown" }).click();
    await modal.getByRole("link", { name: "New Callout Rule" }).click();
  }

  private async fillCalloutForm(config: HttpCalloutConfig) {
    const modal = this.rulesModal;
    // Request Matching
    await modal
      .getByRole("textbox", {
        name: /api\/path|request path|e\.g\.\s*\/api\/path/i,
      })
      .fill(config.path);

    // Response Behaviour

    const responseType = modal
      .locator("#v2CollapseOne")
      .getByRole("combobox")
      .first();

    await responseType.selectOption(config.responseBehaviour);

    // Target endpoint

    await modal
      .getByRole("textbox", {
        name: /your-webhook-endpoint/i,
      })
      .fill(config.targetEndpoint);

    // const payloadLabels = {
    //   forward: "Forward original payload",
    //   custom: "Custom payload",
    // };

    // Payload behaviour
    const payloadSelect = modal
      .locator("#v2CollapseTwo")
      .getByRole("combobox")
      .nth(1);

    await payloadSelect.selectOption({
      value: config.payloadMode,
    });

    // Authentication

    const authSelect = modal
      .locator("#v2CollapseTwo")
      .getByRole("combobox")
      .nth(2);

    await authSelect.selectOption({ label: "None" });
  }

  private async saveCalloutRule() {
    const modal = this.rulesModal;
    const saveButton = this.rulesModal.getByRole("button", {
      name: /save/i,
    });

    await saveButton.click();

    await expect(saveButton).toBeHidden({
      timeout: 10000,
    });
  }
  private async closeRulesModal() {
    await this.rulesModal
      .getByRole("button", {
        name: /close/i,
      })
      .click();

    await expect(this.rulesModal).toBeHidden();
  }
}
