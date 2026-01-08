import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Link from "next/link";

export default function Checkout() {
  const [isActivated, setIsActivated] = useState(false);

  const handleActivate = () => {
    // Burada ileride backend'e "demoyu başlat" isteği atacağız
    setIsActivated(true);
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-white">
      <Navbar />

      <main className="mx-auto max-w-3xl px-4 py-16">
        {!isActivated ? (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Finalize Your Demo</h1>
              <p className="text-white/60">Review your automation package and start your 48-hour trial.</p>
            </div>

            <Card className="p-8 border-cyan-500/20 bg-cyan-500/[0.02]">
              <h3 className="text-xl font-semibold mb-6">Demo Summary</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10">
                  <div>
                    <div className="font-medium">Selected Automation Package</div>
                    <div className="text-xs text-white/40">WhatsApp + CRM + Follow-up</div>
                  </div>
                  <div className="text-cyan-400 font-bold">FREE</div>
                </div>

                <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10">
                  <div>
                    <div className="font-medium">Trial Duration</div>
                    <div className="text-xs text-white/40">Full access to all features</div>
                  </div>
                  <div className="text-white font-bold">48 Hours</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 text-sm text-white/60">
                  <div className="mt-1 h-4 w-4 rounded bg-cyan-500 flex-shrink-0 flex items-center justify-center text-[10px] text-black font-bold">✓</div>
                  <p>No credit card required. We will notify you before the demo expires.</p>
                </div>
                <div className="flex items-start gap-3 text-sm text-white/60">
                  <div className="mt-1 h-4 w-4 rounded bg-cyan-500 flex-shrink-0 flex items-center justify-center text-[10px] text-black font-bold">✓</div>
                  <p>Instant activation. Your AI agents will be ready in seconds.</p>
                </div>
              </div>

              <Button 
                onClick={handleActivate}
                className="w-full mt-10" 
                size="lg"
              >
                Activate My 2-Day Demo Now
              </Button>
            </Card>

            <div className="text-center">
              <Link href="/packages" className="text-sm text-white/40 hover:text-white">
                Cancel and go back
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-8 animate-in fade-in zoom-in duration-500">
            <div className="mx-auto h-24 w-24 rounded-full bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center">
              <span className="text-4xl">🚀</span>
            </div>
            
            <div>
              <h1 className="text-4xl font-bold mb-4">Demo Activated!</h1>
              <p className="text-xl text-white/60">Your AI automation is now live and running.</p>
            </div>

            <Card className="p-8 max-w-md mx-auto">
              <div className="text-sm text-white/40 mb-2 uppercase tracking-widest">Time Remaining</div>
              <div className="text-5xl font-mono font-bold text-cyan-400 mb-6">47:59:59</div>
              
              <div className="space-y-3">
                <Link href="/dashboard">
                  <Button className="w-full">Go to Management Panel</Button>
                </Link>
                <p className="text-xs text-white/40">You can now bind your WhatsApp number in the dashboard.</p>
              </div>
            </Card>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
