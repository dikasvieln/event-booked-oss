# Event Flow Web

Next.js application for event browsing and event details. The current catalog
is sample data. Ticket selection uses the shared `@eventhub/state` checkout
store as a persisted browser draft; it does not reserve inventory or create an
order.

## Setup

From the monorepo root:

```powershell
Copy-Item apps/web/.env.example apps/web/.env.local
```

Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in
`apps/web/.env.local`. These are public client settings. Never expose a
service-role key to the browser or store one in a `NEXT_PUBLIC_` variable.

Run the app with `pnpm --filter @eventhub/web dev`, or start the web app and API
together with `pnpm dev` from the root.

## Shared packages

- `@eventhub/contracts`: shared Zod schemas and TypeScript types.
- `@eventhub/state`: checkout and in-memory UI role Zustand stores.

The API must revalidate ticket IDs, prices, availability, and permissions
before processing an order. See the [root README](../../README.md) for
workspace setup and contribution guidance.
