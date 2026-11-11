# Contributing

Thanks for helping improve Event Flow.

## Development setup

1. Install Node.js 24 and pnpm 9.15.0.
2. Clone the repository and run `pnpm install` from the root.
3. Copy the web and API environment templates as described in the root
   [README](README.md), then add local Supabase credentials.
4. Run `pnpm dev` to start the web app and API.

## Pull requests

- Open an issue first for large features or changes to API behavior.
- Keep each pull request focused and include tests for changed behavior.
- Run the checks relevant to your changes:

  ```bash
  pnpm build
  pnpm lint
  pnpm typecheck
  pnpm test
  pnpm --filter api test:e2e
  ```

- Explain the motivation, user-facing changes, and commands you ran.
- Do not commit credentials, real user data, local env files, or generated
  build output.
- Do not introduce backwards-incompatible API or contract changes without
  documenting them.

## Current project limits

The event catalog is sample data. Checkout state is a client-side draft and
does not reserve tickets or charge a payment method. Validate all prices,
inventory, identities, and permissions on the API before implementing
transactions.
