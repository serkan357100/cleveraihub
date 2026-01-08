import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

export default function Checkout() {
  const [activated, setActivated] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(48 * 60 * 60); // 48 saat

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
          <Card className="p-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Activate Your Demo</h1>
            <p className="text-white/60 mb-8">
              Your 48-hour demo will start immediately.
            </p>

            <Button
              size="lg"
              className="w-full"
              onClick={() => setActivated(true)}
            >
              Activate 2‑Day Demo
            </Button>

            <p className="mt-4 text-xs text-white/40">
              No credit card required.
            </p>
          </Card>
        ) : (
          <Card className="p-10 text-center">
            <div className="text-5xl mb-4">🚀</div>
            <h1 className="text-3xl font-bold mb-2">Demo Activated</h1>
            <p className="text-white/60 mb-6">
              Your automation is live.
            </p>

            <div className="text-sm text-white/40 mb-2">Time Remaining</div>
            <div className="text-4xl font-mono font-bold text-cyan-400 mb-6">
              {formatTime(secondsLeft)}
            </div>

            <Button className="w-full">Go to Dashboard</Button>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
}
