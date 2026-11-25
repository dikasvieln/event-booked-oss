import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  MapPinIcon,
  MicrophoneIcon,
  MusicalNoteIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { SiteFooter } from "@/components/site-footer";
import {
  events,
  type EventCategory,
} from "@/features/events/data";
import { TicketSelector } from "@/features/events/components/ticket-selector";

type EventPageProps = {
  params: Promise<{ slug: string }>;
};

function getEvent(slug: string) {
  return events.find((event) => event.slug === slug);
}

function CategoryIcon({ category }: { category: EventCategory }) {
  if (category === "Music") return <MusicalNoteIcon className="size-3.5" />;
  if (category === "Speaking") return <MicrophoneIcon className="size-3.5" />;
  return <SparklesIcon className="size-3.5" />;
}

export function generateStaticParams() {
  return events.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);

  return {
    title: event
      ? `${event.title} | Event Flow`
      : "Event not found | Event Flow",
    description: event?.description ?? "Explore upcoming events with Event Flow.",
  };
}

export default function EventDetailPage({ params }: EventPageProps) {
  return (
    <div className="min-h-[calc(100vh-3rem)] bg-[#011a23] text-[#e6f8fe]">
      <main className="mx-auto w-full max-w-[1120px] px-5 pb-12 pt-5 sm:px-8 sm:pt-7">
        <Link
          href="/#upcoming-events"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[#8bb7c4] transition-colors hover:text-[#65f2e7]"
        >
          <ArrowLeftIcon className="size-4" />
          All events
        </Link>

        <Suspense fallback={<EventContentSkeleton />}>
          <EventContent params={params} />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}

async function EventContent({ params }: EventPageProps) {
  const { slug } = await params;
  const event = getEvent(slug);

  if (!event) notFound();

  return (
    <>
      <section
        aria-labelledby="event-title"
        className="relative flex min-h-[220px] items-end overflow-hidden rounded-2xl border border-[#16424f] bg-cover bg-center px-6 py-6 sm:min-h-[260px] sm:px-8 sm:py-8"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(1, 26, 35, 0.1) 15%, rgba(1, 26, 35, 0.94) 100%), url("https://images.unsplash.com/${event.image}?auto=format&fit=crop&w=1800&q=90")`,
        }}
      >
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#011a23]/70 px-3 py-1 text-[11px] font-semibold text-[#65f2e7] backdrop-blur-sm">
            <CategoryIcon category={event.category} />
            {event.category === "Shows" ? "Show" : event.category}
          </span>
          <h1
            id="event-title"
            className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight tracking-[-0.045em] sm:text-4xl"
          >
            {event.title}
          </h1>
        </div>
      </section>

      <div className="mt-5 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl border border-[#16424f] bg-[#02232d] p-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#06404b] text-[#65f2e7]">
                <CalendarDaysIcon className="size-5" />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#7faebb]">
                  When
                </p>
                <p className="mt-0.5 text-sm font-semibold">
                  {event.date} · {event.time}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-[#16424f] bg-[#02232d] p-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#06404b] text-[#65f2e7]">
                <MapPinIcon className="size-5" />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#7faebb]">
                  Where
                </p>
                <p className="mt-0.5 text-sm font-semibold">
                  {event.venue}, {event.location}
                </p>
              </div>
            </div>
          </div>

          <section aria-labelledby="about-title" className="mt-6">
            <h2
              id="about-title"
              className="font-display text-lg font-bold tracking-[-0.025em]"
            >
              About this event
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#a3c0ca]">
              {event.description}
            </p>
          </section>

          <section aria-labelledby="lineup-title" className="mt-6">
            <h2
              id="lineup-title"
              className="font-display text-lg font-bold tracking-[-0.025em]"
            >
              Lineup
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {event.lineup.map((performer) => (
                <li
                  key={performer}
                  className="rounded-full border border-[#214450] px-3.5 py-2 text-xs font-medium text-[#c2dbe3]"
                >
                  {performer}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <TicketSelector eventId={event.slug} tiers={event.ticketTiers} />
      </div>
    </>
  );
}

function EventContentSkeleton() {
  return (
    <div role="status">
      <span className="sr-only">Loading event details</span>
      <div aria-hidden="true">
        <section className="relative flex min-h-[220px] animate-pulse items-end overflow-hidden rounded-2xl border border-[#16424f] bg-[#02232d] px-6 py-6 sm:min-h-[260px] sm:px-8 sm:py-8">
          <div className="w-full">
            <div className="h-6 w-24 rounded-full bg-[#16424f]" />
            <div className="mt-3 h-10 w-3/4 max-w-3xl rounded bg-[#16424f]" />
          </div>
        </section>

        <div className="mt-5 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="h-[88px] animate-pulse rounded-xl border border-[#16424f] bg-[#02232d]" />
              <div className="h-[88px] animate-pulse rounded-xl border border-[#16424f] bg-[#02232d]" />
            </div>
            <section className="mt-6">
              <div className="h-6 w-40 animate-pulse rounded bg-[#02232d]" />
              <div className="mt-2 h-16 max-w-2xl animate-pulse rounded bg-[#02232d]" />
            </section>
            <section className="mt-6">
              <div className="h-6 w-20 animate-pulse rounded bg-[#02232d]" />
              <div className="mt-3 flex gap-2">
                <div className="h-8 w-24 animate-pulse rounded-full bg-[#02232d]" />
                <div className="h-8 w-28 animate-pulse rounded-full bg-[#02232d]" />
              </div>
            </section>
          </div>

          <aside className="h-fit animate-pulse rounded-2xl border border-[#16424f] bg-[#02232d] p-4 sm:p-5">
            <div className="h-6 w-36 rounded bg-[#16424f]" />
            <div className="mt-4 h-24 rounded-xl border border-[#16424f]" />
            <div className="mt-2.5 h-24 rounded-xl border border-[#16424f]" />
            <div className="mt-4 h-12 border-t border-[#16424f]" />
            <div className="mt-4 h-11 rounded-full bg-[#16424f]" />
          </aside>
        </div>
      </div>
    </div>
  );
}
