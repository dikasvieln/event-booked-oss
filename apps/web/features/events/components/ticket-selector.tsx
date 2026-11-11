"use client";

import Link from "next/link";
import { useEffect } from "react";
import {
  ArrowRightIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import {
  getCheckoutTicketCount,
  getCheckoutTotalCents,
  useCheckoutStore,
} from "@eventhub/state";
import type { TicketTier } from "@/features/events/data";

export function TicketSelector({
  eventId,
  tiers,
}: {
  eventId: string;
  tiers: TicketTier[];
}) {
  const items = useCheckoutStore((state) => state.items);
  const addTicket = useCheckoutStore((state) => state.addTicket);
  const setTicketQuantity = useCheckoutStore(
    (state) => state.setTicketQuantity,
  );
  const selectedItems = items.filter((item) => item.eventId === eventId);
  const ticketCount = getCheckoutTicketCount(selectedItems);
  const totalPriceCents = getCheckoutTotalCents(selectedItems);

  useEffect(() => {
    if (!useCheckoutStore.persist.hasHydrated()) {
      void useCheckoutStore.persist.rehydrate();
    }
  }, []);

  return (
    <aside className="h-fit rounded-2xl border border-[#16424f] bg-[#02232d] p-4 sm:p-5 lg:sticky lg:top-6">
      <h2 className="font-display text-lg font-bold tracking-[-0.03em]">
        Select tickets
      </h2>
      <ul className="mt-4 space-y-2.5">
        {tiers.map((tier) => {
          const quantity =
            selectedItems.find((item) => item.ticketTypeId === tier.id)
              ?.quantity ?? 0;

          return (
            <li
              key={tier.name}
              className="rounded-xl border border-[#16424f] px-3 py-3.5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-[#dff2f7]">
                    {tier.name}
                  </h3>
                  <p className="mt-0.5 text-[11px] text-[#7faebb]">
                    {tier.description}
                  </p>
                </div>
                <p className="shrink-0 font-display text-sm font-bold text-[#65f2e7]">
                  ${tier.price.toFixed(2)}
                </p>
              </div>
              <div className="mt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  aria-label={`Remove one ${tier.name} ticket`}
                  disabled={quantity === 0}
                  onClick={() =>
                    setTicketQuantity(eventId, tier.id, quantity - 1)
                  }
                  className="flex size-8 items-center justify-center rounded-full border border-[#214450] text-[#b8d5dd] transition-colors hover:border-[#65d3f2] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <MinusIcon className="size-3.5" />
                </button>
                <span
                  className="min-w-3 text-center text-sm font-semibold tabular-nums"
                  aria-live="polite"
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  aria-label={`Add one ${tier.name} ticket`}
                  disabled={quantity === 8}
                  onClick={() =>
                    addTicket({
                      eventId,
                      ticketTypeId: tier.id,
                      name: tier.name,
                      unitPriceCents: Math.round(tier.price * 100),
                    })
                  }
                  className="flex size-8 items-center justify-center rounded-full border border-[#214450] text-[#b8d5dd] transition-colors hover:border-[#65d3f2] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <PlusIcon className="size-3.5" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 flex items-center justify-between border-t border-[#16424f] pt-4 text-sm">
        <p className="text-[#8bb7c4]">
          {ticketCount} {ticketCount === 1 ? "ticket" : "tickets"}
        </p>
        <p className="font-display font-bold text-[#e6f8fe]">
          {totalPriceCents === 0
            ? "Free"
            : `$${(totalPriceCents / 100).toFixed(2)}`}
        </p>
      </div>
      <Link
        href="/login"
        className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-brand px-4 py-3 text-center text-sm font-bold text-[#011a23] transition-transform hover:scale-[1.02]"
      >
        Sign in to continue
        <ArrowRightIcon className="size-4" />
      </Link>
      <p className="mt-2 text-center text-[11px] text-[#789eaa]">
        {ticketCount > 0
          ? "Your selection is saved in this browser."
          : "Choose tickets to see your total."}
      </p>
    </aside>
  );
}
