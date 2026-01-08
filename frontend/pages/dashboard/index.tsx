import { useEffect, useMemo, useState } from "react";
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
  return d.toLocaleDateString("tr-TR") + " " + d.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
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

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

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

    const totalEarnings = automations
      .filter((a) => a.status === "active")
      .reduce((sum, a) => sum + a.monthly, 0);

    const nextPayment = automations
      .map((a) => (a.status === "trial" ? a.trialEndsAt : a.nextBillingAt || 0))
      .filter((t) => t > 0)
      .sort((a, b) => a - b)[0];

    return { total, active, trial, paused, totalEarnings, nextPayment };
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
    <div className="min-h-screen bg-[#0a0f1a] text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12 border-b border-gray-800 pb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            CleverAIHub Panel
          </h1>
          <Link
            href="/"
            className="px-4 py-2 bg-red-900/30 text-red-400 rounded-lg hover:bg-red-900/50 transition-all"
          >
            Çıkış Yap
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800 shadow-xl">
            <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Toplam Otomasyon</p>
            <p className="text-4xl font-bold text-cyan-400">{stats.total}</p>
          </div>

          <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800 shadow-xl">
            <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Aktif</p>
            <p className="text-4xl font-bold text-green-400">{stats.active}</p>
          </div>

          <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800 shadow-xl">
            <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Trial</p>
            <p className="text-4xl font-bold text-yellow-400">{stats.trial}</p>
          </div>

          <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800 shadow-xl">
            <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Aylık Gelir</p>
            <p className="text-4xl font-bold text-green-400">${stats.totalEarnings}</p>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-200">Hızlı İşlemler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/packages"
              className="p-6 bg-gradient-to-br from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 rounded-2xl font-bold text-xl shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center text-center"
            >
              + Yeni Otomasyon Ekle
            </Link>

            <Link
              href="/dashboard/create-package"
              className="p-6 bg-[#1f2937] hover:bg-[#374151] rounded-2xl font-bold text-xl shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center border border-gray-700"
            >
              📦 Paket Oluştur & Sat
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6 text-gray-200">Otomasyonlarınız</h2>

          {automations.length === 0 ? (
            <div className="bg-[#111827] p-12 rounded-2xl border border-gray-800 text-center">
              <p className="text-gray-400 text-lg mb-4">Henüz aktif otomasyonunuz yok.</p>
              <Link
                href="/packages"
                className="inline-block px-6 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-semibold transition-all"
              >
                İlk Otomasyonunuzu Başlatın
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {automations.map((a) => {
                const isTrial = a.status === "trial";
                const trialLeftMs = a.trialEndsAt - now;

                return (
                  <div
                    key={a.id}
                    className="bg-[#111827] rounded-2xl border border-gray-800 p-6 shadow-xl"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-white">{a.name}</h3>
                          <span
                            className={`text-xs px-3 py-1 rounded-full border font-semibold ${
                              a.status === "active"
                                ? "border-green-500/30 bg-green-500/10 text-green-300"
                                : a.status === "trial"
                                  ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-300"
                                  : "border-gray-500/30 bg-gray-500/10 text-gray-300"
                            }`}
                          >
                            {a.status === "active"
                              ? "AKTİF"
                              : a.status === "trial"
                                ? "TRIAL"
                                : "DURDURULDU"}
                          </span>
                        </div>

                        <div className="text-sm text-gray-400 mb-4">
                          Oluşturulma: <span className="text-gray-300">{formatDate(a.createdAt)}</span>
                        </div>

                        {!!a.modules?.length && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {a.modules.map((m) => (
                              <span
                                key={m}
                                className="rounded-full border border-gray-700 bg-gray-800/50 px-3 py-1 text-xs text-gray-300"
                              >
                                {m}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Aylık Kira:</span>
                            <span className="font-semibold text-cyan-400">${a.monthly}/ay</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Satın Alma:</span>
                            <span className="font-semibold text-white">${a.buy}</span>
                          </div>
                        </div>
                      </div>

                      <div className="min-w-[280px] space-y-4">
                        <div className="rounded-xl border border-gray-700 bg-black/30 p-4">
                          {isTrial ? (
                            <>
                              <div className="text-xs text-gray-400 uppercase mb-1">Trial Bitiş</div>
                              <div className="text-2xl font-mono font-bold text-yellow-300 mb-1">
                                {formatTimeLeft(trialLeftMs)}
                              </div>
                              <div className="text-xs text-gray-500">{formatDate(a.trialEndsAt)}</div>
                            </>
                          ) : (
                            <>
                              <div className="text-xs text-gray-400 uppercase mb-1">Sonraki Ödeme</div>
                              <div className="text-sm text-gray-300">
                                {a.nextBillingAt ? formatDate(a.nextBillingAt) : "—"}
                              </div>
                            </>
                          )}
                        </div>

                        <div>
                          <div className="text-xs text-gray-400 uppercase mb-2">WhatsApp Bağlantısı</div>
                          {a.whatsappNumber ? (
                            <div className="text-sm text-green-400 bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                              ✓ Bağlı: {a.whatsappNumber}
                            </div>
                          ) : (
                            <div className="flex gap-2">
                              <input
                                className="flex-1 rounded-lg border border-gray-700 bg-gray-800/50 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                                placeholder="+90 555 123 4567"
                                value={waInputs[a.id] || ""}
                                onChange={(e) => setWaInputs({ ...waInputs, [a.id]: e.target.value })}
                              />
                              <button
                                onClick={() => connectWhatsApp(a.id)}
                                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-semibold transition-all"
                              >
                                Bağla
                              </button>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2">
                          {a.status !== "paused" ? (
                            <button
                              onClick={() => setStatus(a.id, "paused")}
                              className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-all"
                            >
                              Duraklat
                            </button>
                          ) : (
                            <button
                              onClick={() => setStatus(a.id, "trial")}
                              className="flex-1 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-semibold transition-all"
                            >
                              Devam Et
                            </button>
                          )}

                          <button
                            onClick={() => {
                              const next: Automation[] = automations.map((x) =>
                                x.id === a.id
                                  ? {
                                      ...x,
                                      status: "active" as const,
                                      nextBillingAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
                                    }
                                  : x
                              );
                              saveAutomations(next);
                            }}
                            className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg font-semibold transition-all"
                          >
                            Abone Ol
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
