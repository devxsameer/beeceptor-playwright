import { test } from "@playwright/test";
import { EndpointsPage } from "../src/pages/EndpointsPage.js";
import { calloutFixture } from "../src/fixtures/callout.js";

test("HTTP Callout workflow", async ({ page }) => {
  const endpoints = new EndpointsPage(page);

  const dashboard = await endpoints.ensureEndpoint();

  await dashboard.createHttpCalloutRule(calloutFixture);

  await dashboard.triggerRequest(calloutFixture);

  await dashboard.verifyCalloutExecution(calloutFixture);
});
