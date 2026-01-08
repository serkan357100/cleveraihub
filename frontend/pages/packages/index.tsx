import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Link from "next/link";

// Ana sayfadaki 16 paketi buraya da taşıyoruz (Gerçekte API'den gelecek)
const ALL_PACKS = [
  { id: 1, industry: "Real Estate", desc: "Lead → WhatsApp follow‑up → appointment.", demo: "2‑Day Demo", rent: "$59/mo", buy: "$399", modules: ["WhatsApp","CRM","Lead","Appointments"], badge: "Top Seller" },
  { id: 2, industry: "Dental Clinic", desc: "Reminders + reactivation campaigns.", demo: "2‑Day Demo", rent: "$69/mo", buy: "$449", modules: ["WhatsApp","CRM","Appointments"], badge: "High ROI" },
  { id: 3, industry: "Medical Clinic", desc: "Patient intake + follow‑ups.", demo: "2‑Day Demo", rent: "$79/mo", buy: "$499", modules: ["WhatsApp","CRM","Follow‑up"] },
  { id: 4, industry: "Law Firm", desc: "Intake + case follow‑ups.", demo: "2‑Day Demo", rent: "$79/mo", buy: "$499", modules: ["WhatsApp","CRM","Follow‑up"] },
  { id: 5, industry: "Accounting", desc: "Onboarding + document reminders.", demo: "2‑Day Demo", rent: "$49/mo", buy: "$349", modules: ["WhatsApp","CRM","Follow‑up"], badge: "Quick Setup" },
  { id: 6, industry: "Insurance Agency", desc: "Policy renewals + lead nurturing.", demo: "2‑Day Demo", rent: "$59/mo", buy: "$399", modules: ["WhatsApp","CRM","Lead","Follow‑up"] },
  { id: 7, industry: "Marketing Agency", desc: "Client onboarding + project updates.", demo: "2‑Day Demo", rent: "$69/mo", buy: "$449", modules: ["WhatsApp","CRM","Follow‑up"] },
  { id: 8, industry: "E‑commerce Store", desc: "Order updates + abandoned cart recovery.", demo: "2‑Day Demo", rent: "$49/mo", buy: "$349", modules: ["WhatsApp","CRM","Follow‑up"], badge: "Best Value" },
  { id: 9, industry: "Restaurant", desc: "Reservations + confirmations.", demo: "2‑Day Demo", rent: "$59/mo", buy: "$399", modules: ["WhatsApp","Appointments"] },
  { id: 10, industry: "Hotel", desc: "Booking inquiries + guest follow‑ups.", demo: "2‑Day Demo", rent: "$79/mo", buy: "$499", modules: ["WhatsApp","CRM","Follow‑up"] },
  { id: 11, industry: "Gym / Fitness", desc: "Trial leads + retention follow‑ups.", demo: "2‑Day Demo", rent: "$49/mo", buy: "$349", modules: ["WhatsApp","CRM","Follow‑up"] },
  { id: 12, industry: "Salon / Barbershop", desc: "Bookings + no‑show prevention.", demo: "2‑Day Demo", rent: "$49/mo", buy: "$349", modules: ["WhatsApp","Appointments"] },
  { id: 13, industry: "Auto Repair", desc: "Service reminders + upsell campaigns.", demo: "2‑Day Demo", rent: "$59/mo", buy: "$399", modules: ["WhatsApp","CRM","Follow‑up"] },
  { id: 14, industry: "Home Services", desc: "Job scheduling + follow‑ups.", demo: "2‑Day Demo", rent: "$59/mo", buy: "$399", modules: ["WhatsApp","CRM","Appointments"] },
  { id: 15, industry: "Education / Coaching", desc: "Student onboarding + engagement.", demo: "2‑Day Demo", rent: "$69/mo", buy: "$449", modules: ["WhatsApp","CRM","Follow‑up"] },
  { id: 16, industry: "HR / Recruitment", desc: "Candidate tracking + interview scheduling.", demo: "2‑Day Demo", rent: "$79/mo", buy: "$499", modules: ["WhatsApp","CRM","Appointments"] },
];

export default function Marketplace() {
  const [search, setSearch] = useState("");

  const filteredPacks = ALL_PACKS.filter(p => 
    p.industry.toLowerCase().includes(search.toLowerCase()) ||
    p.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#070B14] text-white">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Automation Marketplace</h1>
            <p className="mt-2 text-white/60 text-lg">
              Browse and activate pre-built AI automation packages.
            </p>
          </div>
          
          <div className="w-full md:w-80">
            <input 
              type="text"
              placeholder="Search industry or module..."
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPacks.map((p) => (
            <Card key={p.id} className="p-6 flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{p.industry}</h3>
                  <span className="text-xs text-cyan-400 font-medium uppercase tracking-wider">{p.demo}</span>
                </div>
                {p.badge && (
                  <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-[10px] text-cyan-300 ring-1 ring-cyan-400/20">
                    {p.badge}
                  </span>
                )}
              </div>

              <p className="text-sm text-white/60 mb-6 flex-grow">{p.desc}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {p.modules.map((m) => (
                  <span key={m} className="rounded-lg border border-white/5 bg-white/5 px-2 py-1 text-[11px] text-white/70">
                    {m}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="rounded-xl bg-black/40 p-3 border border-white/5">
                  <div className="text-[10px] text-white/40 uppercase">Monthly Rent</div>
                  <div className="text-lg font-bold text-white">{p.rent}</div>
                </div>
                <div className="rounded-xl bg-black/40 p-3 border border-white/5">
                  <div className="text-[10px] text-white/40 uppercase">One-time Buy</div>
                  <div className="text-lg font-bold text-white">{p.buy}</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Link href={`/packages/${p.id}`} className="flex-1">
                  <Button className="w-full" size="sm">Start Demo</Button>
                </Link>
                <Link href={`/packages/${p.id}`}>
                  <Button variant="secondary" size="sm">Details</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {filteredPacks.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/40 text-xl">No packages found matching your search.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
