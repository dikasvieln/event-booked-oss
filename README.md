# Event Flow

Event Flow is an event discovery and ticketing application built as a
TypeScript monorepo. The current repository includes a Next.js event browsing
experience, a NestJS API foundation, and shared contracts and client state.
The API, database, payments, and authenticated checkout are still under
development; this is not yet a production ticketing service.

## What works today

- Browse and search sample events, filter by category, and view event details.
- Select ticket types and quantities; the checkout draft is saved in browser
  storage.
- Shared Zod contracts and Zustand stores are available to workspace apps.
- The Nest API has a Supabase bearer-token guard, role guard, public health
  endpoint, and feature module scaffolds.

The sample catalog is local UI data. Ticket selection is only a client-side
draft: no reservation, payment, or order is created. The API and database
feature modules are scaffolds and must be completed before handling real
transactions.

## Repository layout

```text
apps/
  api/                 NestJS API and authentication foundation
  web/                 Next.js app
packages/
  contracts/           Shared Zod schemas and TypeScript types
  state/               Shared Zustand checkout and role stores
supabase/               Supabase project files and migrations (planned)
```

## Prerequisites

- Node.js 24 or a compatible current LTS release
- pnpm 9.15.0 (the version declared by the root `package.json`)
- A Supabase project for sign-in and protected API routes

Install dependencies from the repository root:

```bash
pnpm install
```

## Local development

Configure the web app:

```powershell
Copy-Item apps/web/.env.example apps/web/.env.local
```

Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in
`apps/web/.env.local`. These are public client configuration values; never put
a Supabase service-role key in a `NEXT_PUBLIC_` variable.

Configure the API:

```powershell
Copy-Item apps/api/env.example apps/api/.env
```

Set `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `apps/api/.env`. The API listens
on port 3001 by default, while the web app uses port 3000.

Run both apps from the repository root:

```bash
pnpm dev
```

Or start either app separately:

```bash
pnpm --filter @eventhub/web dev
pnpm --filter api start:dev
```

The web app is at <http://localhost:3000>; the API is at
<http://localhost:3001>. `GET /` and `GET /health` are public. Other API routes
require a Supabase bearer token by default. See [apps/api/README.md](apps/api/README.md)
for guard and role details.

## Checks

Run the available workspace checks from the root:

```bash
pnpm build
pnpm lint
pnpm typecheck
pnpm test
pnpm --filter api test:e2e
```

The app-specific setup and scripts are documented in
[apps/web/README.md](apps/web/README.md) and [apps/api/README.md](apps/api/README.md).

## Shared packages

Import shared schemas and types from `@eventhub/contracts`. Import client-side
stores and helpers from `@eventhub/state`:

```ts
import { CheckoutOrderSchema, type UserRole } from "@eventhub/contracts";
import { useCheckoutStore, useUserRoleStore } from "@eventhub/state";
```

Persisted cart contents and UI roles are client-controlled. The API must
revalidate ticket IDs, prices, availability, and authorization before
processing an order.

## Contributing

Contributions are welcome. Before opening a pull request:

1. Open an issue for significant features or behavior changes.
2. Keep changes focused and add or update tests for behavior.
3. Run the relevant build, lint, type-check, and test commands above.
4. Never commit credentials, local environment files, generated output, or
   real customer data.
5. Describe the user impact, implementation, and validation in the pull
   request.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the contributor workflow.

## Before the first public release

- Choose and add an open-source `LICENSE`. Until then, the repository does not
  grant a license to reuse its code.
- Review repository history and rotate any credentials that may have been
  committed previously. Removing a secret from the current files does not
  remove it from Git history.
- Enable GitHub private vulnerability reporting and publish a security contact
  before inviting external contributions.
- Complete and review database migrations, order reservation, payment
  webhooks, and authorization before accepting real payments.

See [SECURITY.md](SECURITY.md) for security reporting guidance.
