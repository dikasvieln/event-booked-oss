import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  CheckoutOrderSchema,
  TicketSelectionSchema,
  type CheckoutOrder,
  type TicketSelection,
} from "@eventhub/contracts";

const MAX_QUANTITY_PER_TICKET_TYPE = 8;

export type CheckoutState = {
  items: TicketSelection[];
  addTicket: (ticket: Omit<TicketSelection, "quantity">) => void;
  setTicketQuantity: (
    eventId: string,
    ticketTypeId: string,
    quantity: number,
  ) => void;
  removeTicket: (eventId: string, ticketTypeId: string) => void;
  clearOrder: () => void;
};

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      items: [],
      addTicket: (ticket) => {
        const validTicket = TicketSelectionSchema.parse({
          ...ticket,
          quantity: 1,
        });

        set((state) => {
          const itemIndex = state.items.findIndex(
            (item) =>
              item.eventId === validTicket.eventId &&
              item.ticketTypeId === validTicket.ticketTypeId,
          );

          if (itemIndex === -1) {
            return {
              items: [...state.items, validTicket],
            };
          }

          return {
            items: state.items.map((item, index) =>
              index === itemIndex
                ? {
                    ...item,
                    name: validTicket.name,
                    unitPriceCents: validTicket.unitPriceCents,
                    quantity: Math.min(
                      MAX_QUANTITY_PER_TICKET_TYPE,
                      item.quantity + 1,
                    ),
                  }
                : item,
            ),
          };
        });
      },
      setTicketQuantity: (eventId, ticketTypeId, quantity) =>
        set((state) => {
          if (!Number.isInteger(quantity)) {
            throw new RangeError("Ticket quantity must be an integer.");
          }
          const clampedQuantity = Math.min(
            MAX_QUANTITY_PER_TICKET_TYPE,
            Math.max(0, Math.trunc(quantity)),
          );
          const existingItem = state.items.find(
            (item) =>
              item.eventId === eventId && item.ticketTypeId === ticketTypeId,
          );

          if (!existingItem) return state;
          if (clampedQuantity === 0) {
            return {
              items: state.items.filter(
                (item) =>
                  item.eventId !== eventId ||
                  item.ticketTypeId !== ticketTypeId,
              ),
            };
          }

          return {
            items: state.items.map((item) =>
              item.eventId === eventId && item.ticketTypeId === ticketTypeId
                ? { ...item, quantity: clampedQuantity }
                : item,
            ),
          };
        }),
      removeTicket: (eventId, ticketTypeId) =>
        set((state) => ({
          items: state.items.filter(
            (item) =>
              item.eventId !== eventId || item.ticketTypeId !== ticketTypeId,
          ),
        })),
      clearOrder: () => set({ items: [] }),
    }),
    {
      name: "eventhub-checkout-order",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state): Pick<CheckoutState, "items"> => ({
        items: state.items,
      }),
      merge: (persistedState, currentState) => {
        if (persistedState === undefined) return currentState;
        const order = CheckoutOrderSchema.parse(persistedState);
        return { ...currentState, items: order.items };
      },
      onRehydrateStorage: () => (_state, error) => {
        if (error) {
          console.error("Failed to restore the saved checkout order.", error);
        }
      },
    },
  ),
);

export function getCheckoutOrder(state: CheckoutState): CheckoutOrder {
  return { items: state.items };
}

export function getCheckoutTicketCount(items: TicketSelection[]): number {
  return items.reduce((count, item) => count + item.quantity, 0);
}

export function getCheckoutTotalCents(items: TicketSelection[]): number {
  return items.reduce(
    (total, item) => total + item.unitPriceCents * item.quantity,
    0,
  );
}
