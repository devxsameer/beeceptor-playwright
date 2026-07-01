import { test } from "@playwright/test";

import { EndpointsPage } from "../src/pages/EndpointsPage.js";
import { endpointFixture } from "../src/fixtures/endpoint.js";

test("ensure endpoint exists", async ({ page }) => {
  const endpoints = new EndpointsPage(page);

  await endpoints.ensureEndpoint(endpointFixture.name);
});
