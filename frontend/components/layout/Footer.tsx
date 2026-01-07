import Link from "next/link";

export default function Footer() {
  return (
    <div className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-white/60">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="font-semibold text-white">CleverAIHub</div>
            <div className="text-white/60">
              Build and buy AI automation packages in minutes.
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link className="hover:text-white" href="/packages">Marketplace</Link>
            <Link className="hover:text-white" href="/dashboard">Dashboard</Link>
            <Link className="hover:text-white" href="/checkout">Checkout</Link>
          </div>
        </div>

        <div className="mt-8 text-xs text-white/40">
          © {new Date().getFullYear()} CleverAIHub. All rights reserved.
        </div>
      </div>
    </div>
  );
}
