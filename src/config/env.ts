import "dotenv/config";

function required(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export const env = {
  baseUrl: required("BASE_URL"),
  email: required("EMAIL"),
  password: required("PASSWORD"),
  endpointName: process.env.ENDPOINT_NAME ?? "sameer-playwright-assignment",
  webhookUrl:
    process.env.WEBHOOK_URL ?? "https://wehhook-api.free.beeceptor.com/",
} as const;
