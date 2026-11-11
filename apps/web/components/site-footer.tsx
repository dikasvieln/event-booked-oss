export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.07]">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col items-center justify-between gap-2 px-5 py-6 text-xs text-[#789eaa] sm:flex-row sm:px-8">
        <p>Find your next unforgettable night with Event Flow.</p>
        <p>
          Made with <span aria-label="love" className="text-[#65f2e7]">♥</span> by{" "}
          <span className="font-semibold text-[#a3c0ca]">auliamdika</span>
        </p>
      </div>
    </footer>
  );
}
