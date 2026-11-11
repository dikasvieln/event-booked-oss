# Event Flow API

NestJS API foundation for Event Flow. Feature modules for orders, payments,
events, ticket types, users, check-in, and notifications are scaffolds; they do
not yet implement persistence or business operations.

## Setup

From the monorepo root:

```powershell
Copy-Item apps/api/env.example apps/api/.env
```

Set `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `apps/api/.env`. The API listens
on port 3001 by default.

Start the API with `pnpm --filter api start:dev`. The root `pnpm dev` command
starts both the API and web app.

## Authentication

- `GET /` and `GET /health` are public.
- All other routes require a valid Supabase access token in the
  `Authorization: Bearer <token>` header.
- `@Public()` opts a controller or route out of authentication.
- `@Roles('organizer')` restricts a route to trusted `app_metadata` roles.
- `@CurrentUser()` provides the verified user in a controller.

The API looks up the token with Supabase Auth and does not trust role values
from editable `user_metadata`. Configure role claims using a trusted
administrative workflow. API guards are the authorization boundary; the web
role store is only for role-aware UI.

## Checks

```bash
pnpm --filter api build
pnpm --filter api lint
pnpm --filter api typecheck
pnpm --filter api test
pnpm --filter api test:e2e
```

Database connections, Drizzle schema/migrations, order processing, payment
webhooks, and background jobs still need implementation.
