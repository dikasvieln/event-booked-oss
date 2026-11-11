import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  MapPinIcon,
  MicrophoneIcon,
  MusicalNoteIcon,
  SparklesIcon,
  TicketIcon,
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

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = getEvent(slug);

  if (!event) notFound();

  return (
    <div className="min-h-screen bg-[#011a23] text-[#e6f8fe]">
      <header className="border-b border-white/[0.07]">
        <div className="mx-auto flex h-12 w-full max-w-[1120px] items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-2.5"
              aria-label="Event Flow home"
            >
              <span className="flex size-7 items-center justify-center rounded-lg bg-brand text-[#011a23]">
                <TicketIcon className="size-4" strokeWidth={2.2} />
              </span>
              <span className="font-display text-[17px] font-bold tracking-[-0.04em]">
                Event <span className="text-brand">Flow</span>
              </span>
            </Link>
            <nav aria-label="Main navigation" className="hidden items-center gap-2 sm:flex">
              <Link
                href="/#upcoming-events"
                className="rounded-full bg-white/[0.09] px-4 py-2 text-xs font-semibold text-[#65f2e7]"
              >
                Events
              </Link>
              <Link
                href="/#design-system"
                className="rounded-full px-2 py-2 text-xs font-medium text-[#a2bdc7] transition-colors hover:text-white"
              >
                Design System
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-full px-3 py-2 text-xs font-semibold text-[#d3e6ec] transition-colors hover:text-[#65f2e7]"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="rounded-full bg-brand px-4 py-2.5 text-xs font-bold text-[#011a23] transition-transform hover:scale-[1.03]"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1120px] px-5 pb-12 pt-5 sm:px-8 sm:pt-7">
        <Link
          href="/#upcoming-events"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[#8bb7c4] transition-colors hover:text-[#65f2e7]"
        >
          <ArrowLeftIcon className="size-4" />
          All events
        </Link>

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
      </main>
      <SiteFooter />
    </div>
  );
}
