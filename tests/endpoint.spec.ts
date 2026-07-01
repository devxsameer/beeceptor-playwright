import { test } from "@playwright/test";

import { EndpointsPage } from "../src/pages/EndpointsPage.js";

test("ensure endpoint exists", async ({ page }) => {
  const endpoints = new EndpointsPage(page);

  const endpointDashboard = await endpoints.ensureEndpoint();
});
