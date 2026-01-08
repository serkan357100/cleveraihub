import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

export default function Checkout() {
  const [activated, setActivated] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(48 * 60 * 60);
  const [prices, setPrices] = useState({ monthly: 0, buy: 0 });

  // FİYATLARI OKU
  useEffect(() => {
    const data = localStorage.getItem("checkout_data");
    if (data) {
      setPrices(JSON.parse(data));
    }
  }, []);

  // Demo başladıktan sonra süreyi düşür
  useEffect(() => {
    if (!activated) return;

    const timer = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [activated]);

  // Süre formatı
  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-white">
      <Navbar />

      <main className="mx-auto max-w-3xl px-4 py-16">
        {!activated ? (
          <Card className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">
              Confirm Your Demo
            </h1>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-white/60">Monthly Rent</span>
                <span className="font-bold text-cyan-400">
                  ${prices.monthly}/mo
                </span>
              </div>

              <div className="flex justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-white/60">One‑time Buy</span>
                <span className="font-bold text-white">${prices.buy}</span>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full"
              onClick={() => setActivated(true)}
            >
              Activate 2‑Day Demo
            </Button>

            <p className="mt-4 text-xs text-white/40 text-center">
              No credit card required.
            </p>
          </Card>
        ) : (
          <Card className="p-10 text-center">
            <div className="text-5xl mb-4">🚀</div>
            <h1 className="text-3xl font-bold mb-2">Demo Activated</h1>
            <p className="text-white/60 mb-6">Your automation is live.</p>

            <div className="text-sm text-white/40 mb-2">Time Remaining</div>
            <div className="text-4xl font-mono font-bold text-cyan-400 mb-6">
              {formatTime(secondsLeft)}
            </div>

            <Button
              className="w-full"
              onClick={() => {
                window.location.href = "/dashboard";
              }}
            >
              Go to Dashboard
            </Button>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
}

