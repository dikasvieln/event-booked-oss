import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#011a23] px-5 text-[#e6f8fe]">
      <section className="w-full max-w-md rounded-3xl border border-[#16424f] bg-[#02232d] p-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#65f2e7]">
          Event Flow
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight">
          Sign in
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#a3c0ca]">
          Account sign-in is not available yet. You can keep exploring upcoming
          events in the meantime.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-brand px-5 py-3 text-sm font-bold text-[#011a23] transition-transform hover:scale-[1.03]"
        >
          Browse events
        </Link>
        <p className="mt-6 text-sm text-[#8bb7c4]">
          New to Event Flow?{" "}
          <Link href="/register" className="font-semibold text-[#65d3f2] hover:text-[#65f2e7]">
            Sign up
          </Link>
        </p>
      </section>
    </main>
  );
}