import Link from "next/link";
import Button from "../ui/Button";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-[#070B14]/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-cyan-500/15 ring-1 ring-cyan-400/30 grid place-items-center">
            <span className="text-cyan-300 font-black">C</span>
          </div>
          <div className="leading-tight">
            <div className="font-bold text-white">CleverAIHub</div>
            <div className="text-xs text-white/50">AI Automation Marketplace</div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm text-white/70">
          <Link className="hover:text-white" href="/packages">
            Marketplace
          </Link>
          <Link className="hover:text-white" href="/dashboard">
            Dashboard
          </Link>
          <Link className="hover:text-white" href="/dashboard/create-package">
            Sell a Package
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {/* Dil switch placeholder (ileride i18n) */}
          <div className="hidden sm:flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/70">
            <span className="text-white">EN</span>
            <span className="opacity-50">/</span>
            <span className="opacity-60">TR</span>
          </div>
          <Link href="/packages">
            <Button variant="secondary" size="sm">Browse</Button>
          </Link>
          <Link href="/dashboard">
            <Button size="sm">Start</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
