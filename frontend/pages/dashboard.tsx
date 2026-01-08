import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Link from "next/link";

type Automation = {
  id: string;
  name: string;
  modules: string[];
  monthly: number;
  buy: number;
  status: "trial" | "active" | "paused";
  createdAt: number;
  trialEndsAt: number;
  nextBillingAt?: number;
  whatsappNumber?: string;
};

function formatDate(ts: number) {
  const d = new Date(ts);
  return d.toLocaleString();
}

function formatTimeLeft(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
}

export default function Dashboard() {
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [now, setNow] = useState(Date.now());
  const [waInputs, setWaInputs] = useState<Record<string, string>>({});

  // her saniye "now" güncelle → trial kalan süre canlı görünsün
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  // localStorage'dan otomasyonları oku
  useEffect(() => {
    const raw = localStorage.getItem("clever_active_automations");
    if (!raw) {
      setAutomations([]);
      return;
    }
    try {
      const parsed = JSON.parse(raw);
      setAutomations(Array.isArray(parsed) ? parsed : []);
    } catch {
      setAutomations([]);
    }
  }, []);

  const saveAutomations = (next: Automation[]) => {
    setAutomations(next);
    localStorage.setItem("clever_active_automations", JSON.stringify(next));
  };

  const stats = useMemo(() => {
    const total = automations.length;
    const active = automations.filter((a) => a.status === "active").length;
    const trial = automations.filter((a) => a.status === "trial").length;
    const paused = automations.filter((a) => a.status === "paused").length;

    const nextPayment = automations
      .map((a) => {
        // trial ise "trial bitişi" önemli tarih
        const ts = a.status === "trial" ? a.trialEndsAt : (a.nextBillingAt || 0);
        return ts;
      })
      .filter((t) => t > 0)
      .sort((a, b) => a - b)[0];

    return { total, active, trial, paused, nextPayment };
  }, [automations]);

  const setStatus = (id: string, status: Automation["status"]) => {
    const next = automations.map((a) => (a.id === id ? { ...a, status } : a));
    saveAutomations(next);
  };

  const connectWhatsApp = (id: string) => {
    const num = (waInputs[id] || "").trim();
    if (num.length < 6) return;

    const next = automations.map((a) => (a.id === id ? { ...a, whatsappNumber: num } : a));
    saveAutomations(next);
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-white">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Management Panel</h1>
            <p className="text-white/60">All your automations, billing dates, and connections in one place.</p>
          </div>

          <Link href="/packages">
            <Button>+ Add New Automation</Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card className="p-6">
            <div className="text-xs text-white/40 uppercase mb-2">Total Automations</div>
            <div className="text-3xl font-bold">{stats.total}</div>
          </Card>

          <Card className="p-6">
            <div className="text-xs text-white/40 uppercase mb-2">Active</div>
            <div className="text-3xl font-bold text-green-400">{stats.active}</div>
          </Card>

          <Card className="p-6">
            <div className="text-xs text-white/40 uppercase mb-2">Trial</div>
            <div className="text-3xl font-bold text-cyan-400">{stats.trial}</div>
          </Card>

          <Card className="p-6">
            <div className="text-xs text-white/40 uppercase mb-2">Next Important Date</div>
            <div className="text-sm text-white/70">
              {stats.nextPayment ? formatDate(stats.nextPayment) : "—"}
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h2 className="text-xl font-bold">Your Automations</h2>
            <div className="text-xs text-white/40">
              Tip: Trial ends are shown as the “next date” until you subscribe.
            </div>
          </div>

          {automations.length === 0 ? (
            <div className="p-8 text-center text-white/60">
              No automations yet. Click <span className="text-white">Add New Automation</span> to start.
            </div>
          ) : (
            <div className="space-y-4">
              {automations.map((a) => {
                const isTrial = a.status === "trial";
                const trialLeftMs = a.trialEndsAt - now;

                return (
                  <div key={a.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <div className="font-semibold text-white">{a.name}</div>
                          <span className={`text-xs px-3 py-1 rounded-full border ${
                            a.status === "active"
                              ? "border-green-500/30 bg-green-500/10 text-green-300"
                              : a.status === "trial"
                                ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-200"
                                : "border-yellow-500/30 bg-yellow-500/10 text-yellow-200"
                          }`}>
                            {a.status.toUpperCase()}
                          </span>
                        </div>

                        <div className="mt-2 text-sm text-white/60">
                          Created: <span className="text-white/70">{formatDate(a.createdAt)}</span>
                        </div>

                        {!!a.modules?.length && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {a.modules.map((m) => (
                              <span key={m} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                                {m}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="min-w-[260px] space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-white/50">Monthly</span>
                          <span className="font-semibold text-cyan-300">${a.monthly}/mo</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-white/50">Buy</span>
                          <span className="font-semibold">${a.buy}</span>
                        </div>

                        <div className="mt-3 rounded-xl border border-white/10 bg-black/20 p-3">
                          {isTrial ? (
                            <>
                              <div className="text-xs text-white/40 uppercase">Trial ends in</div>
                              <div className="text-lg font-mono font-bold text-cyan-300">
                                {formatTimeLeft(trialLeftMs)}
                              </div>
                              <div className="text-xs text-white/50">
                                Ends at: {formatDate(a.trialEndsAt)}
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="text-xs text-white/40 uppercase">Next billing</div>
                              <div className="text-sm text-white/70">
                                {a.nextBillingAt ? formatDate(a.nextBillingAt) : "—"}
                              </div>
                            </>
                          )}
                        </div>

                        <div className="mt-3 space-y-2">
                          <div className="text-xs text-white/40 uppercase">WhatsApp Connection</div>
                          {a.whatsappNumber ? (
                            <div className="text-sm text-green-300">
                              Connected: <span className="text-white/70">{a.whatsappNumber}</span>
                            </div>
                          ) : (
                            <div className="flex gap-2">
                              <input
                                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
                                placeholder="+1 234 567 8900"
                                value={waInputs[a.id] || ""}
                                onChange={(e) => setWaInputs({ ...waInputs, [a.id]: e.target.value })}
                              />
                              <Button onClick={() => connectWhatsApp(a.id)}>Connect</Button>
                            </div>
                          )}
                        </div>

                        <div className="mt-4 flex gap-2">
                          {a.status !== "paused" ? (
                            <Button variant="secondary" className="flex-1" onClick={() => setStatus(a.id, "paused")}>
                              Pause
                            </Button>
                          ) : (
                            <Button className="flex-1" onClick={() => setStatus(a.id, "trial")}>
                              Resume
                            </Button>
                          )}

                          <Button
                            className="flex-1"
                            onClick={() => {
                              // MVP: "Subscribe" tıklanınca trial -> active yapıyoruz (gerçekte ödeme olacak)
                              const next = automations.map((x) =>
                                x.id === a.id
                                  ? { ...x, status: "active", nextBillingAt: Date.now() + 30 * 24 * 60 * 60 * 1000 }
                                  : x
                              );
                              saveAutomations(next);
                            }}
                          >
                            Subscribe
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </main>

      <Footer />
    </div>
  );
}
