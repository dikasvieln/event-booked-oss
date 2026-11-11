# `@eventhub/state`

Shared client-side Zustand stores for browser applications in this workspace.

```ts
import {
  getCheckoutTotalCents,
  useCheckoutStore,
  useUserRoleStore,
} from "@eventhub/state";
```

The checkout store uses `(eventId, ticketTypeId)` as its unique selection key,
caps each type at eight tickets, and persists the draft selection in browser
storage. Storage hydration is opt-in so server-rendered pages can hydrate
without a client/server markup mismatch. The web ticket selector starts
hydration on mount.

Only treat the cart as a user experience draft: persisted prices, quantities,
and identities are client-controlled. The API must look up current prices,
availability, and permissions before creating an order.

The role store is memory-only. Populate it from a verified auth session and
clear it on sign-out. It is for rendering role-aware UI, not authorization;
protected operations must still be checked by the API.
