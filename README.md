# Beeceptor HTTP Callout Automation

End-to-end Playwright automation for Beeceptor's **HTTP Callout** feature.

This project automates the complete workflow required for the assignment:

- Authenticate into Beeceptor
- Create or reuse an endpoint
- Configure an HTTP Callout rule
- Trigger an API request
- Verify the HTTP Callout executes successfully
- Clean up created test data

The project is written in **TypeScript** using **Playwright** and follows the **Page Object Model (POM)** pattern for maintainability and readability.

---

## Features

- ✅ Persistent authenticated session
- ✅ Automatic endpoint reuse
- ✅ HTTP Callout rule configuration
- ✅ Request and response verification
- ✅ Automatic cleanup after execution
- ✅ Configurable through environment variables

---

## Tech Stack

- Playwright
- TypeScript
- Node.js
- dotenv

---

## Project Structure

```text
.
├── src
│   ├── config
│   ├── fixtures
│   ├── pages
│   └── auth
├── tests
│   └── http-callout.e2e.spec.ts
├── playwright.config.ts
├── package.json
└── README.md
```

---

## Workflow

```
Authenticate
      │
      ▼
Create or Reuse Endpoint
      │
      ▼
Configure HTTP Callout Rule
      │
      ▼
Trigger API Request
      │
      ▼
Verify Request & Response
      │
      ▼
Cleanup Test Data
```

---

## Setup

### Clone the repository

```bash
git clone https://github.com/devxsameer/beeceptor-playwright.git

cd beeceptor-playwright
```

### Install dependencies

```bash
pnpm install
```

### Create an environment file

Create a `.env` file using `.env.example`.

```env
BASE_URL=https://app.beeceptor.com

EMAIL=

PASSWORD=

ENDPOINT_NAME=sameer-playwright-assignment

WEBHOOK_URL=
```

---

## Running the Automation

Run all tests

```bash
pnpm test
```

Run in headed mode

```bash
pnpm test:headed
```

Run in debug mode

```bash
pnpm test:debug
```

Open the HTML report

```bash
pnpm report
```

---

## Automation Coverage

### Authentication

- Logs into Beeceptor
- Saves authenticated browser state
- Reuses the session for subsequent tests

---

### Endpoint Management

- Creates an endpoint if it does not exist
- Reuses an existing endpoint when available

---

### HTTP Callout

- Opens Mock Rules
- Creates a new HTTP Callout rule
- Configures request matching
- Configures target endpoint
- Saves the rule

---

### Verification

- Sends an API request to the Beeceptor endpoint
- Verifies the request appears in the request log
- Verifies the response status
- Verifies the matching rule executed successfully

---

### Cleanup

- Deletes the created HTTP Callout rule
- Leaves the endpoint reusable for future executions

---

## Design Decisions

- Uses the **Page Object Model (POM)** to separate page interactions from test logic.
- Stores authenticated browser state to avoid logging in before every test.
- Reuses endpoints to keep test execution idempotent.
- Stores configuration in fixtures and environment variables.
- Cleans up created rules to respect Beeceptor Free plan limitations.

---

## Assumptions

- A Beeceptor account already exists.
- Login credentials are supplied through environment variables.
- A reachable webhook endpoint is available for HTTP Callout verification.
- The Beeceptor UI remains functionally consistent.

---

## Assignment Workflow

This automation satisfies the required end-to-end workflow:

- Login to Beeceptor
- Create or reuse an endpoint
- Configure an HTTP Callout rule
- Trigger an API request
- Verify successful execution
- Clean up created test data

---

## Author

**Sameer Ali**
