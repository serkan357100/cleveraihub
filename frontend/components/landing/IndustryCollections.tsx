import Link from "next/link";
import Card from "../ui/Card";
import Button from "../ui/Button";

type IndustryPack = {
  industry: string;
  subtitle: string;
  demo: string;
  priceMonthly: string;
  priceBuy: string;
  modules: string[];
  href: string;
  tag?: string;
};

const INDUSTRIES: IndustryPack[] = [
  {
    industry: "Real Estate",
    subtitle: "Lead → WhatsApp follow-up → appointment.",
    demo: "2‑Day Demo",
    priceMonthly: "$59/mo",
    priceBuy: "$399 one‑time",
    modules: ["WhatsApp", "CRM", "Lead", "Appointments"],
    href: "/packages/1",
    tag: "Top Seller",
  },
  {
    industry: "Accounting",
    subtitle: "Client onboarding + document reminders.",
    demo: "2‑Day Demo",
    priceMonthly: "$49/mo",
    priceBuy: "$349 one‑time",
    modules: ["WhatsApp", "CRM", "Follow‑up"],
    href: "/packages/2",
    tag: "Quick Setup",
  },
  {
    industry: "Restaurant",
    subtitle: "Reservations + WhatsApp confirmations.",
    demo: "2‑Day Demo",
    priceMonthly: "$59/mo",
    priceBuy: "$399 one‑time",
    modules: ["WhatsApp", "Appointments"],
    href: "/packages/3",
    tag: "High ROI",
  },
  {
    industry: "Hotel",
    subtitle: "Booking inquiries + guest follow-ups.",
    demo: "2‑Day Demo",
    priceMonthly: "$79/mo",
    priceBuy: "$499 one‑time",
    modules: ["WhatsApp", "CRM", "Follow‑up"],
    href: "/packages/4",
  },
  {
    industry: "Dental Clinic",
    subtitle: "Appointment reminders + reactivation campaigns.",
    demo: "2‑Day Demo",
    priceMonthly: "$69/mo",
    priceBuy: "$449 one‑time",
    modules: ["WhatsApp", "CRM", "Appointments"],
    href: "/packages/5",
  },
  {
    industry: "Retail / Market",
    subtitle: "Customer care + repeat-purchase reminders.",
    demo: "2‑Day Demo",
    priceMonthly: "$49/mo",
    priceBuy: "$349 one‑time",
    modules: ["WhatsApp", "CRM", "Follow‑up"],
    href: "/packages/6",
  },
];

export default function IndustryCollections() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Industry Packages
          </h2>
          <p className="mt-2 text-white/60">
            Pick a ready-made package for your business. Includes a <span className="text-cyan-200">2‑day demo</span>.
          </p>
        </div>
        <Link href="/packages" className="hidden md:block">
          <Button variant="secondary">Explore marketplace</Button>
        </Link>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {INDUSTRIES.map((p) => (
          <Card key={p.industry} className="p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-white font-semibold text-lg">{p.industry}</div>
                <div className="mt-1 text-sm text-white/60">{p.subtitle}</div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs text-cyan-200 ring-1 ring-cyan-400/20">
                  {p.demo}
                </span>
                {p.tag ? (
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                    {p.tag}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {p.modules.map((m) => (
                <span
                  key={m}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                >
                  {m}
                </span>
              ))}
            </div>

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                <div className="text-xs text-white/50">Rent</div>
                <div className="text-white font-bold">{p.priceMonthly}</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                <div className="text-xs text-white/50">Buy</div>
                <div className="text-white font-bold">{p.priceBuy}</div>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <Link href={p.href} className="flex-1">
                <Button className="w-full">Start demo</Button>
              </Link>
              <Link href="/packages">
                <Button variant="secondary">Details</Button>
              </Link>
            </div>

            <div className="mt-3 text-xs text-white/40">
              Demo auto-expires in 48 hours if not activated.
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 md:hidden">
        <Link href="/packages">
          <Button variant="secondary" className="w-full">
            Explore marketplace
          </Button>
        </Link>
      </div>
    </section>
  );
}
