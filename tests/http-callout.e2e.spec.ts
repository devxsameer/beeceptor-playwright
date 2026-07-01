import { test } from "@playwright/test";
import { EndpointsPage } from "../src/pages/EndpointsPage.js";
import { calloutFixture } from "../src/fixtures/callout.js";

test("should configure and verify an HTTP Callout end-to-end", async ({
  page,
}) => {
  const endpoints = new EndpointsPage(page);
  let dashboard: any;

  await test.step("Ensure endpoint exists", async () => {
    dashboard = await endpoints.ensureEndpoint();
  });

  await test.step("Configure HTTP Callout", async () => {
    await dashboard.ensureHttpCalloutRule(calloutFixture);
  });

  await test.step("Trigger API request", async () => {
    await dashboard.triggerRequest(calloutFixture);
  });

  await test.step("Verify execution", async () => {
    await dashboard.verifyCalloutExecution(calloutFixture);
  });

  await test.step("Cleanup", async () => {
    await dashboard.cleanup(calloutFixture);
  });
});
