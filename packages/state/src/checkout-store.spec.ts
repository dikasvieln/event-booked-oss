import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import type * as CheckoutStore from "./checkout-store";

let checkoutStore: typeof CheckoutStore;

beforeAll(async () => {
  const entries = new Map<string, string>();
  vi.stubGlobal("localStorage", {
    getItem: (key: string) => entries.get(key) ?? null,
    setItem: (key: string, value: string) => entries.set(key, value),
    removeItem: (key: string) => entries.delete(key),
  });
  checkoutStore = await import("./checkout-store");
});

describe("checkout store", () => {
  beforeEach(() => {
    checkoutStore.useCheckoutStore.getState().clearOrder();
  });

  it("keeps a unique selection per event and ticket type", () => {
    const addTicket = checkoutStore.useCheckoutStore.getState().addTicket;
    addTicket({
      eventId: "event-a",
      ticketTypeId: "general",
      name: "General Admission",
      unitPriceCents: 4500,
    });
    addTicket({
      eventId: "event-a",
      ticketTypeId: "general",
      name: "General Admission",
      unitPriceCents: 4500,
    });
    addTicket({
      eventId: "event-b",
      ticketTypeId: "general",
      name: "General Admission",
      unitPriceCents: 3000,
    });

    const order = checkoutStore.getCheckoutOrder(
      checkoutStore.useCheckoutStore.getState(),
    );
    expect(order.items).toHaveLength(2);
    expect(checkoutStore.getCheckoutTicketCount(order.items)).toBe(3);
    expect(checkoutStore.getCheckoutTotalCents(order.items)).toBe(12000);
  });

  it("caps each selection at eight and removes it when quantity reaches zero", () => {
    const { addTicket, setTicketQuantity } =
      checkoutStore.useCheckoutStore.getState();
    addTicket({
      eventId: "event-a",
      ticketTypeId: "general",
      name: "General Admission",
      unitPriceCents: 4500,
    });
    setTicketQuantity("event-a", "general", 20);
    expect(
      checkoutStore.useCheckoutStore.getState().items[0]?.quantity,
    ).toBe(8);

    setTicketQuantity("event-a", "general", 0);
    expect(checkoutStore.useCheckoutStore.getState().items).toEqual([]);
  });

  it("rejects fractional quantities", () => {
    expect(() =>
      checkoutStore.useCheckoutStore
        .getState()
        .setTicketQuantity("event-a", "general", 1.5),
    ).toThrow("Ticket quantity must be an integer.");
  });
});

afterAll(() => {
  vi.unstubAllGlobals();
});
