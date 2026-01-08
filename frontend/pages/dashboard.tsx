import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

export default function Dashboard() {
  const [secondsLeft, setSecondsLeft] = useState(48 * 60 * 60);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  // Sayaç
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const handleConnect = () => {
    if (whatsappNumber.length > 5) {
      setIsConnected(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-white">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Management Panel</h1>
          <p className="text-white/60">
            Control your automation, connect services, and monitor performance.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          {/* Demo Süresi */}
          <Card className="p-6 border-cyan-500/20">
            <div className="text-xs text-white/40 uppercase mb-2">
              Demo Time Remaining
            </div>
            <div className="text-3xl font-mono font-bold text-cyan-400">
              {formatTime(secondsLeft)}
            </div>
            <p className="text-xs text-white/40 mt-3">
              {secondsLeft > 0
                ? "Your demo is active"
                : "Demo expired. Subscribe to continue."}
            </p>
          </Card>

          {/* Aktif Modüller */}
          <Card className="p-6">
            <div className="text-xs text-white/40 uppercase mb-2">
              Active Modules
            </div>
            <div className="text-3xl font-bold">3</div>
            <div className="flex gap-2 mt-3">
              <span className="text-xs bg-white/5 px-2 py-1 rounded">
                WhatsApp
              </span>
              <span className="text-xs bg-white/5 px-2 py-1 rounded">
                CRM
              </span>
              <span className="text-xs bg-white/5 px-2 py-1 rounded">
                Follow-up
              </span>
            </div>
          </Card>

          {/* Durum */}
          <Card className="p-6">
            <div className="text-xs text-white/40 uppercase mb-2">
              Status
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xl font-bold">Live</span>
            </div>
            <p className="text-xs text-white/40 mt-3">
              All systems operational
            </p>
          </Card>
        </div>

        {/* WhatsApp Bağlama */}
        <Card className="p-8 mb-8">
          <h3 className="text-2xl font-bold mb-4">
            Connect Your WhatsApp Number
          </h3>

          {!isConnected ? (
            <div className="space-y-4">
              <p className="text-white/60">
                Enter your WhatsApp Business number to activate automated
                messaging.
              </p>

              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="+1 234 567 8900"
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                />
                <Button onClick={handleConnect}>Connect</Button>
              </div>

              <p className="text-xs text-white/40">
                We'll send a verification code to this number.
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-4 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
              <div className="text-3xl">✅</div>
              <div>
                <div className="font-bold text-green-400">
                  WhatsApp Connected
                </div>
                <div className="text-sm text-white/60">{whatsappNumber}</div>
              </div>
            </div>
          )}
        </Card>

        {/* Paket Detayları */}
        <Card className="p-8">
          <h3 className="text-2xl font-bold mb-6">Your Package</h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 rounded-xl bg-white/5">
              <span className="font-medium">Package Type</span>
              <span className="text-cyan-400">Custom Demo</span>
            </div>

            <div className="flex justify-between items-center p-4 rounded-xl bg-white/5">
              <span className="font-medium">Monthly Price</span>
              <span className="font-bold">$45/mo</span>
            </div>

            <div className="flex justify-between items-center p-4 rounded-xl bg-white/5">
              <span className="font-medium">One-time Purchase</span>
              <span className="font-bold">$320</span>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <Button className="flex-1">Subscribe Now</Button>
            <Button variant="secondary" className="flex-1">
              Buy Lifetime Access
            </Button>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
