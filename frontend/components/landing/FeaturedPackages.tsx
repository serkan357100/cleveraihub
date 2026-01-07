import Link from "next/link";
import Card from "../ui/Card";
import Button from "../ui/Button";

const PACKS = [
  {
    name: "Starter",
    price: "$29/mo",
    desc: "WhatsApp + CRM basics for fast response.",
    modules: ["WhatsApp", "CRM", "Follow‑up"],
    href: "/packages/1",
    badge: "Most Popular",
  },
  {
    name: "Pro",
    price: "$59/mo",
    desc: "Lead capture + follow‑up + appointment scheduling.",
    modules: ["WhatsApp", "CRM", "Lead", "Appointments"],
    href: "/packages/2",
    badge: "For Growth",
  },
  {
    name: "Advanced",
    price: "$99/mo",
    desc: "Best for teams: workflows + reporting + scaling.",
    modules: ["WhatsApp", "CRM", "Lead", "Appointments"],
    href: "/packages/3",
    badge: "Scale",
  },
];

export default function FeaturedPackages() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Featured Packages
          </h2>
          <p className="mt-2 text-white/60">
            Pre-built automation bundles you can activate in minutes.
          </p>
        </div>
        <Link href="/packages" className="hidden md:block">
          <Button variant="secondary">View all</Button>
        </Link>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {PACKS.map((p) => (
          <Card key={p.name} className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-white font-semibold">{p.name}</div>
              <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs text-cyan-200 ring-1 ring-cyan-400/20">
                {p.badge}
              </span>
            </div>

            <div className="mt-3 text-3xl font-extrabold text-white">
              {p.price}
            </div>
            <p className="mt-2 text-sm text-white/60">{p.desc}</p>

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

            <div className="mt-6 flex gap-2">
              <Link href={p.href} className="flex-1">
                <Button className="w-full">Start</Button>
              </Link>
              <Link href="/packages">
                <Button variant="ghost">Details</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 md:hidden">
        <Link href="/packages">
          <Button variant="secondary" className="w-full">View all packages</Button>
        </Link>
      </div>
    </section>
  );
}
