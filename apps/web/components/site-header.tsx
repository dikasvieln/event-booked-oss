import Link from "next/link";
import { TicketIcon } from "@heroicons/react/24/outline";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#011a23]/95 backdrop-blur">
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
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-2 sm:flex"
          >
            <Link
              href="/#upcoming-events"
              className="rounded-full bg-white/[0.09] px-4 py-2 text-xs font-semibold text-[#65f2e7]"
            >
              Events
            </Link>
            <Link
              href="/#about-us"
              className="rounded-full px-2 py-2 text-xs font-medium text-[#a2bdc7] transition-colors hover:text-white"
            >
              About Us
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
  );
}
