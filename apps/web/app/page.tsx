"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  CalendarDaysIcon,
  MapPinIcon,
  MagnifyingGlassIcon,
  MusicalNoteIcon,
  TicketIcon,
  MicrophoneIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { events, type CategoryFilter, type EventCategory } from "@/features/events/data";
import { SiteFooter } from "@/components/site-footer";

const filters: CategoryFilter[] = ["All", "Music", "Speaking", "Shows"];

function CategoryIcon({ category }: { category: EventCategory }) {
  if (category === "Music") return <MusicalNoteIcon className="size-3.5" />;
  if (category === "Speaking") return <MicrophoneIcon className="size-3.5" />;
  return <SparklesIcon className="size-3.5" />;
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("All");
  const [search, setSearch] = useState("");

  const visibleEvents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return events.filter((event) => {
      const matchesCategory =
        activeFilter === "All" || event.category === activeFilter;
      const matchesSearch =
        query.length === 0 ||
        [
          event.title,
          event.category,
          event.venue,
          event.location,
        ].some((value) => value.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, search]);

  return (
    <div className="min-h-screen bg-[#011a23] text-[#e6f8fe]">
      <header className="border-b border-white/[0.07]">
        <div className="mx-auto flex h-12 w-full max-w-[1120px] items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5" aria-label="Event Flow home">
              <span className="flex size-7 items-center justify-center rounded-lg bg-brand text-[#011a23]">
                <TicketIcon className="size-4" strokeWidth={2.2} />
              </span>
              <span className="font-display text-[17px] font-bold tracking-[-0.04em]">
                Event <span className="text-brand">Flow</span>
              </span>
            </Link>
            <nav aria-label="Main navigation" className="hidden items-center gap-2 sm:flex">
              <a
                href="#upcoming-events"
                className="rounded-full bg-white/[0.09] px-4 py-2 text-xs font-semibold text-[#65f2e7]"
              >
                Events
              </a>
              <a
                href="#design-system"
                className="rounded-full px-2 py-2 text-xs font-medium text-[#a2bdc7] transition-colors hover:text-white"
              >
                Design System
              </a>
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

      <main className="mx-auto w-full max-w-[1120px] px-5 pb-16 pt-8 sm:px-8 sm:pt-10">
        <section
          aria-labelledby="hero-title"
          className="overflow-hidden rounded-[24px] border border-[#16424f] bg-[radial-gradient(ellipse_at_top_left,_rgba(4,91,112,0.68),_rgba(1,36,47,0.94)_60%,_rgba(1,29,39,0.98))] px-7 py-8 sm:px-10 sm:py-9"
        >
          <div className="max-w-[620px]">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#65f2e7]">
              Live. Together.
            </p>
            <h1
              id="hero-title"
              className="font-display text-[clamp(2.2rem,4.5vw,3rem)] font-bold leading-[1.03] tracking-[-0.055em]"
            >
              Find your next
              <br />
              <span className="text-brand">unforgettable</span> night.
            </h1>
            <p className="mt-4 max-w-[490px] text-sm leading-6 text-[#a3c0ca]">
              Concerts, talks and live shows. Pick your seats, pay once, and walk
              in with a QR code.
            </p>
            <label className="mt-6 flex h-12 w-full max-w-[510px] items-center gap-3 rounded-full border border-[#1a4a59] bg-[#011a23]/70 px-4 transition-colors focus-within:border-[#65d3f2]">
              <MagnifyingGlassIcon className="size-[17px] shrink-0 text-[#65d3f2]" />
              <span className="sr-only">Search events, venues, or cities</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search events, venues or cities"
                className="w-full bg-transparent text-sm text-[#e6f8fe] outline-none placeholder:text-[#527b88]"
              />
            </label>
          </div>
        </section>

        <section id="upcoming-events" aria-labelledby="events-title" className="pt-8">
          <div className="flex flex-col gap-5">
            <div>
              <h2
                id="events-title"
                className="font-display text-[25px] font-bold tracking-[-0.04em] sm:text-[27px]"
              >
                Upcoming events
              </h2>
              <p className="mt-1 text-[13px] text-[#7faebb]" aria-live="polite">
                {visibleEvents.length} {visibleEvents.length === 1 ? "event" : "events"} found
              </p>
            </div>
            <div className="flex flex-wrap gap-2" aria-label="Filter events by category">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={activeFilter === filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                    activeFilter === filter
                      ? "border-transparent bg-brand text-[#011a23]"
                      : "border-[#214450] text-[#c2dbe3] hover:border-[#65d3f2]/70 hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {visibleEvents.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {visibleEvents.map((event) => (
                <Link
                  key={event.title}
                  href={`/events/${event.slug}`}
                  aria-label={`View details for ${event.title}`}
                  className="group overflow-hidden rounded-[16px] border border-[#163b47] bg-[#02232d] transition-transform duration-200 hover:-translate-y-1 hover:border-[#2b6574]"
                >
                  <div
                    role="img"
                    aria-label={`${event.category} event`}
                    className="relative h-[184px] bg-cover bg-center sm:h-[174px]"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(1, 26, 35, 0.1) 35%, rgba(1, 26, 35, 0.76) 100%), url("https://images.unsplash.com/${event.image}?auto=format&fit=crop&w=1000&q=85")`,
                    }}
                  >
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#011a23]/75 px-2.5 py-1 text-[10px] font-semibold text-[#e6f8fe] backdrop-blur-sm">
                      <CategoryIcon category={event.category} />
                      {event.category === "Shows" ? "Show" : event.category}
                    </span>
                    <span className="absolute bottom-3 right-3 rounded-full bg-brand px-3 py-1.5 text-[11px] font-bold text-[#011a23] shadow-lg">
                      From ${event.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="truncate font-display text-[15px] font-semibold tracking-[-0.02em] text-[#e6f8fe]">
                      {event.title}
                    </h3>
                    <div className="mt-2.5 space-y-1.5 text-xs text-[#8bb7c4]">
                      <p className="flex items-center gap-2">
                        <CalendarDaysIcon className="size-3.5 shrink-0 text-[#65d3f2]" />
                        <span>{event.date} · {event.time}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPinIcon className="size-3.5 shrink-0 text-[#65d3f2]" />
                        <span className="truncate">{event.venue}, {event.location}</span>
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-[#214450] px-6 py-12 text-center">
              <p className="font-display text-lg font-semibold">No events found</p>
              <p className="mt-1 text-sm text-[#8bb7c4]">
                Try another search or choose a different category.
              </p>
            </div>
          )}
        </section>
        <span id="design-system" className="sr-only">
          Event Flow design system
        </span>
      </main>
      <SiteFooter />
    </div>
  );
}
