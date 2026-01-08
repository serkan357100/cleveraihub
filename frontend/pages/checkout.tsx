import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

export default function Checkout() {
  const [activated, setActivated] = useState(false);
  const [alreadyHasTrial, setAlreadyHasTrial] = useState(false);
  const [data, setData] = useState<any>({ monthly: 0, buy: 0, moduleLabels: [] });

  useEffect(() => {
    const raw = localStorage.getItem("checkout_data");
    if (raw) setData(JSON.parse(raw));

    const existing = localStorage.getItem("clever_active_automations");
    if (existing && JSON.parse(existing).length > 0) {
      setAlreadyHasTrial(true);
    }
  }, []);

  const activateDemo = () => {
    const now = Date.now();
    const automation = {
      id: `auto_${now}`,
      name: "Custom Demo Automation",
      modules: data.moduleLabels || [],
      monthly: data.monthly,
      buy: data.buy,
      status: "trial",
      createdAt: now,
      trialEndsAt: now + 48 * 60 * 60 * 1000,
    };

    const existingRaw = localStorage.getItem("clever_active_automations");
    const existing = existingRaw ? JSON.parse(existingRaw) : [];
    localStorage.setItem("clever_active_automations", JSON.stringify([automation, ...existing]));
    setActivated(true);
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-white">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-16">
        {!activated ? (
          <Card className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Denemeyi Onayla</h1>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-white/60">Aylık Kira</span>
                <span className="font-bold text-cyan-400">${data.monthly}/ay</span>
              </div>
              <div className="flex justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-white/60">Satın Alma</span>
                <span className="font-bold text-white">${data.buy}</span>
              </div>
            </div>

            {alreadyHasTrial ? (
              <div className="text-center p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl mb-4">
                <p className="text-yellow-400 text-sm">Zaten aktif bir otomasyonunuz bulunuyor. Dashboard üzerinden yönetebilirsiniz.</p>
                <Button className="mt-4 w-full" onClick={() => window.location.href="/dashboard"}>Panele Git</Button>
              </div>
            ) : (
              <Button size="lg" className="w-full" onClick={activateDemo}>48 Saatlik Denemeyi Başlat</Button>
            )}
          </Card>
        ) : (
          <Card className="p-10 text-center">
            <div className="text-5xl mb-4">🚀</div>
            <h1 className="text-3xl font-bold mb-2">Deneme Başlatıldı</h1>
            <p className="text-white/60 mb-6">Otomasyonunuz şu an aktif.</p>
            <Button className="w-full" onClick={() => window.location.href = "/dashboard"}>Panele Git</Button>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
}

