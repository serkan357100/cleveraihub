import Card from "../ui/Card";

type Pack = {
  industry: string;
  desc: string;
  demo: string;
  rent: string;
  buy: string;
  modules: string[];
  badge?: string;
};

const PACKS: Pack[] = [
  { industry: "Real Estate", desc: "Lead → WhatsApp follow‑up → appointment.", demo: "2‑Day Demo", rent: "$59/mo", buy: "$399", modules: ["WhatsApp","CRM","Lead","Appointments"], badge: "Top Seller" },
  { industry: "Dental Clinic", desc: "Reminders + reactivation campaigns.", demo: "2‑Day Demo", rent: "$69/mo", buy: "$449", modules: ["WhatsApp","CRM","Appointments"], badge: "High ROI" },
  { industry: "Medical Clinic", desc: "Patient intake + follow‑ups.", demo: "2‑Day Demo", rent: "$79/mo", buy: "$499", modules: ["WhatsApp","CRM","Follow‑up"] },
  { industry: "Law Firm", desc: "Intake + case follow‑ups.", demo: "2‑Day Demo", rent: "$79/mo", buy: "$499", modules: ["WhatsApp","CRM","Follow‑up"] },
  { industry: "Accounting", desc: "Onboarding + document reminders.", demo: "2‑Day Demo", rent: "$49/mo", buy: "$349", modules: ["WhatsApp","CRM","Follow‑up"], badge: "Quick Setup" },
  { industry: "Insurance Agency", desc: "Policy renewals + lead nurturing.", demo: "2‑Day Demo", rent: "$59/mo", buy: "$399", modules: ["WhatsApp","CRM","Lead","Follow‑up"] },
  { industry: "Marketing Agency", desc: "Client onboarding + project updates.", demo: "2‑Day Demo", rent: "$69/mo", buy: "$449", modules: ["WhatsApp","CRM","Follow‑up"] },
  { industry: "E‑commerce Store", desc: "Order updates + abandoned cart recovery.", demo: "2‑Day Demo", rent: "$49/mo", buy: "$349", modules: ["WhatsApp","CRM","Follow‑up"], badge: "Best Value" },
  { industry: "Restaurant", desc: "Reservations + confirmations.", demo: "2‑Day Demo", rent: "$59/mo", buy: "$399", modules: ["WhatsApp","Appointments"] },
  { industry: "Hotel", desc: "Booking inquiries + guest follow‑ups.", demo: "2‑Day Demo", rent: "$79/mo", buy: "$499", modules: ["WhatsApp","CRM","Follow‑up"] },
  { industry: "Gym / Fitness", desc: "Trial leads + retention follow‑ups.", demo: "2‑Day Demo", rent: "$49/mo", buy: "$349", modules: ["WhatsApp","CRM","Follow‑up"] },
  { industry: "Salon / Barbershop", desc: "Bookings + no‑show prevention.", demo: "2‑Day Demo", rent: "$49/mo", buy: "$349", modules: ["WhatsApp","Appointments"] },
  { industry: "Auto Repair", desc: "Service reminders + upsell campaigns.", demo: "2‑Day Demo", rent: "$59/mo", buy: "$399", modules: ["WhatsApp","CRM","Follow‑up"] },
  { industry: "Home Services", desc: "Job scheduling + follow‑ups.", demo: "2‑Day Demo", rent: "$59/mo", buy: "$399", modules: ["WhatsApp","CRM","Appointments"] },
  { industry: "Education / Coaching", desc: "Student onboarding + engagement.", demo: "2‑Day Demo", rent: "$69/mo", buy: "$449", modules: ["WhatsApp","CRM","Follow‑up"] },
  { industry: "HR / Recruitment", desc: "Candidate tracking + interview scheduling.", demo: "2‑Day Demo", rent: "$79/mo", buy: "$499", modules: ["WhatsApp","CRM","Appointments"] },
];

function Row({ reverse = false }: { reverse?: boolean }) {
  const items = [...PACKS, ...PACKS];

  return (
    <div className="relative overflow-hidden">
      <div
        className={`flex w-max gap-4 py-2 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {items.map((p, idx) => (
          <Card key={`${p.industry}-${idx}`} className="w-[320px] p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-white font-semibold">{p.industry}</div>
                <div className="mt-1 text-sm text-white/60">{p.desc}</div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs text-cyan-200 ring-1 ring-cyan-400/20">
                  {p.demo}
                </span>
                {p.badge ? (
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                    {p.badge}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {p.modules.map((m) => (
                <span key={m} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  {m}
                </span>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                <div className="text-[11px] text-white/50">Rent</div>
                <div className="text-white font-bold">{p.rent}</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                <div className="text-[11px] text-white/50">Buy</div>
                <div className="text-white font-bold">{p.buy}</div>
              </div>
            </div>

            <div className="mt-3 text-xs text-white/40">
              Demo auto-expires in 48 hours if not activated.
            </div>
          </Card>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#070B14] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#070B14] to-transparent" />
    </div>
  );
}

export default function IndustryCarousel() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16">
      <h2 className="text-2xl md:text-3xl font-bold text-white">
        Industry Packages
      </h2>
      <p className="mt-2 text-white/60">
        A marketplace of ready-to-activate automation bundles for different businesses.
      </p>

      <div className="mt-6 space-y-4">
        <Row />
        <Row reverse />
      </div>
    </section>
  );
}
