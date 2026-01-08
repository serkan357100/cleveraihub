import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Link from "next/link";

// Örnek Modül Fiyatları (Mantık için)
const MODULE_PRICES: any = {
  "WhatsApp": { rent: 20, buy: 150 },
  "CRM": { rent: 15, buy: 100 },
  "Lead": { rent: 10, buy: 70 },
  "Appointments": { rent: 14, buy: 80 },
  "Follow‑up": { rent: 10, buy: 50 },
};

export default function PackageDetail() {
  const router = useRouter();
  const { id } = router.query;

  // Şimdilik demo veri (Gerçekte ID'ye göre API'den gelecek)
  const [selectedModules, setSelectedModules] = useState<string[]>(["WhatsApp", "CRM", "Follow‑up"]);
  const [basePrice, setBasePrice] = useState({ rent: 49, buy: 349 });

  // Fiyatı dinamik hesapla
  const calculateTotal = () => {
    let rent = 0;
    let buy = 0;
    selectedModules.forEach(m => {
      rent += MODULE_PRICES[m]?.rent || 0;
      buy += MODULE_PRICES[m]?.buy || 0;
    });
    return { rent, buy };
  };

  const totals = calculateTotal();

  const toggleModule = (mod: string) => {
    if (selectedModules.includes(mod)) {
      if (selectedModules.length > 1) {
        setSelectedModules(selectedModules.filter(m => m !== mod));
      }
    } else {
      setSelectedModules([...selectedModules, mod]);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-white">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-12">
        <Link href="/packages" className="text-cyan-400 text-sm hover:underline mb-6 inline-block">
          ← Back to Marketplace
        </Link>

        <div className="grid gap-8 md:grid-cols-3">
          {/* SOL KOLON: Paket Detayları ve Modüller */}
          <div className="md:col-span-2 space-y-6">
            <section>
              <h1 className="text-4xl font-bold mb-2">Package Configuration</h1>
              <p className="text-white/60">Customize your automation by adding or removing modules.</p>
            </section>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Included Modules</h3>
              <div className="space-y-3">
                {Object.keys(MODULE_PRICES).map((mod) => (
                  <div 
                    key={mod}
                    onClick={() => toggleModule(mod)}
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${
                      selectedModules.includes(mod) 
                      ? "border-cyan-500/50 bg-cyan-500/5" 
                      : "border-white/10 bg-white/5 opacity-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-5 w-5 rounded-md border flex items-center justify-center ${selectedModules.includes(mod) ? "bg-cyan-500 border-cyan-500" : "border-white/20"}`}>
                        {selectedModules.includes(mod) && <span className="text-[10px] text-black font-bold">✓</span>}
                      </div>
                      <span className="font-medium">{mod} Agent</span>
                    </div>
                    <div className="text-sm text-white/40">
                      +${MODULE_PRICES[mod].rent}/mo
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-2">How the 2-Day Demo works</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Once you start the demo, you will have 48 hours of full access to all selected modules. 
                You can connect your WhatsApp number and test the CRM integration immediately. 
                After 48 hours, the system will pause unless a subscription or purchase is made.
              </p>
            </Card>
          </div>

          {/* SAĞ KOLON: Fiyatlandırma ve Özet */}
          <div className="space-y-6">
            <Card className="p-6 sticky top-24 border-cyan-500/20 shadow-[0_0_30px_-10px_rgba(34,211,238,0.2)]">
              <h3 className="text-lg font-bold mb-4">Order Summary</h3>
              
              <div className="space-y-2 mb-6">
                {selectedModules.map(m => (
                  <div key={m} className="flex justify-between text-sm">
                    <span className="text-white/60">{m} Agent</span>
                    <span>${MODULE_PRICES[m].rent}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 space-y-4">
                <div className="flex justify-between items-end">
                  <div className="text-sm text-white/60">Monthly Rent</div>
                  <div className="text-2xl font-bold text-cyan-400">${totals.rent}<span className="text-xs text-white/40 ml-1">/mo</span></div>
                </div>
                <div className="flex justify-between items-end">
                  <div className="text-sm text-white/60">One-time Buy</div>
                  <div className="text-xl font-bold text-white">${totals.buy}</div>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <Link href="/checkout">
                  <Button className="w-full" size="lg">Start 2-Day Free Demo</Button>
                </Link>
                <p className="text-[10px] text-center text-white/40">No credit card required for demo</p>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}




