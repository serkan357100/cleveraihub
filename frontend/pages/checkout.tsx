import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

type CheckoutData = {
  packageName?: string;
  moduleLabels?: string[];
  monthly?: number;
  buy?: number;
};

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
};

export default function Checkout() {
  const [activated, setActivated] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(48 * 60 * 60);
  const [data, setData] = useState<CheckoutData>({
    packageName: "",
    moduleLabels: [],
    monthly: 0,
    buy: 0,
  });

  // checkout_data oku
  useEffect(() => {
    const raw = localStorage.getItem("checkout_data");
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      setData({
        packageName: parsed.packageName || "Custom Demo Automation",
        moduleLabels: parsed.moduleLabels || [],
        monthly: Number(parsed.monthly || 0),
        buy: Number(parsed.buy || 0),
      });
    } catch {
      // ignore
    }
  }, []);

  // demo başlayınca sayaç aksın
  useEffect(() => {
    if (!activated) return;
    const timer = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [activated]);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const canActivate = useMemo(() => (data.monthly || 0) > 0 || (data.buy || 0) > 0, [data]);

  const activateDemo = () => {
    const now = Date.now();
    const trialEndsAt = now + 48 * 60 * 60 * 1000;

    const automation: Automation = {
      id: `auto_${now}`,
      name: data.packageName || "Custom Demo Automation",
      modules: data.moduleLabels || [],
      monthly: Number(data.monthly || 0),
      buy: Number(data.buy || 0),
      status: "trial",
      createdAt: now,
      trialEndsAt,
    };

    const existingRaw = localStorage.getItem("clever_active_automations");
    const existing: Automation[] = existingRaw ? JSON.parse(existingRaw) : [];
    localStorage.setItem("clever_active_automations", JSON.stringify([automation, ...existing]));

    setActivated(true);
    setSecondsLeft(48 * 60 * 60);
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-white">
      <Navbar />

      <main className="mx-auto max-w-3xl px-4 py-16">
        {!activated ? (
          <Card className="p-8">
            <h1 className="text-3xl font-bold mb-2 text-center">Confirm Your Demo</h1>
            <p className="text-white/60 mb-8 text-center">Review details and activate your 48-hour trial.</p>

            <div className="space-y-4 mb-8">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-xs text-white/40 uppercase">Package</div>
                <div className="font-semibold">{data.packageName || "Custom Demo Automation"}</div>
                {!!data.moduleLabels?.length && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {data.moduleLabels.map((m) => (
                      <span key={m} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                        {m}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-white/60">Monthly Rent</span>
                <span className="font-bold text-cyan-400">${Number(data.monthly || 0)}/mo</span>
              </div>

              <div className="flex justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-white/60">One‑time Buy</span>
                <span className="font-bold text-white">${Number(data.buy || 0)}</span>
              </div>
            </div>

            <Button size="lg" className="w-full" onClick={activateDemo} disabled={!canActivate}>
              Activate 2‑Day Demo
            </Button>

            <p className="mt-4 text-xs text-white/40 text-center">No credit card required.</p>
          </Card>
        ) : (
          <Card className="p-10 text-center">
            <div className="text-5xl mb-4">🚀</div>
            <h1 className="text-3xl font-bold mb-2">Demo Activated</h1>
            <p className="text-white/60 mb-6">Your automation is live.</p>

            <div className="text-sm text-white/40 mb-2">Time Remaining</div>
            <div className="text-4xl font-mono font-bold text-cyan-400 mb-6">{formatTime(secondsLeft)}</div>

            <Button className="w-full" onClick={() => (window.location.href = "/dashboard")}>
              Go to Dashboard
            </Button>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
}
