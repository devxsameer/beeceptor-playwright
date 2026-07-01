import { env } from "../config/env.js";
import type { HttpCalloutConfig } from "../pages/EndpointDashboardPage.js";

export const calloutFixture = {
  method: "GET",
  path: "/callout",
  targetEndpoint: env.webhookUrl!,
  responseBehaviour: "sync",
  payloadMode: "forward",
} satisfies HttpCalloutConfig;
