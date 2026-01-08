import { useRouter } from "next/router";
import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Link from "next/link";

// Modül listesi ve fiyatları
const MODULES: any = {
  whatsapp: { label: "WhatsApp", rent: 20, buy: 150 },
  crm: { label: "CRM", rent: 15, buy: 100 },
  lead: { label: "Lead", rent: 10, buy: 70 },
  appointments: { label: "Appointments", rent: 14, buy: 80 },
  followup: { label: "Follow-up", rent: 10, buy: 50 },
};

export default function PackageDetail() {
  const router = useRouter();
  
  // Başlangıçta seçili gelen modüller
  const [selectedKeys, setSelectedKeys] = useState<string[]>(["whatsapp", "crm", "followup"]);

  // Fiyat hesaplama fonksiyonu
  const calculateTotal = () => {
    let rent = 0;
    let buy = 0;
    selectedKeys.forEach((key) => {
      rent += MODULES[key].rent;
      buy += MODULES[key].buy;
    });
    return { rent, buy };
  };

  const totals = calculateTotal();

  // Modül seçme/çıkarma fonksiyonu
  const toggleModule = (key: string) => {
    if (selectedKeys.includes(key)) {
      if (selectedKeys.length > 1) {
        setSelectedKeys(selectedKeys.filter((k) => k !== key));
      }
    } else {
      setSelectedKeys([...selectedKeys, key]);
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
          <div className="md:col-span-2 space-y-6">
            <section>
              <h1 className="text-4xl font-bold mb-2">Package Configuration</h1>
              <p className="text-white/60">Customize your automation by adding or removing modules.</p>
            </section>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Included Modules</h3>
              <div className="space-y-3">
                {Object.keys(MODULES).map((key) => (
                  <div 
                    key={key}
                    onClick={() => toggleModule(key)}
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${
                      selectedKeys.includes(key) 
                      ? "border-cyan-500/50 bg-cyan-500/5" 
                      : "border-white/10 bg-white/5 opacity-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-5 w-5 rounded-md border flex items-center justify-center ${selectedKeys.includes(key) ? "bg-cyan-500 border-cyan-500" : "border-white/20"}`}>
                        {selectedKeys.includes(key) && <span className="text-[10px] text-black font-bold">✓</span>}
                      </div>
                      <span className="font-medium">{MODULES[key].label} Agent</span>
                    </div>
                    <div className="text-sm text-white/40">
                      +${MODULES[key].rent}/mo
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-2">How the 2-Day Demo works</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Once you start the demo, you will have 48 hours of full access to all selected modules. 
                After 48 hours, the system will pause unless a subscription or purchase is made.
              </p>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 sticky top-24 border-cyan-500/20 shadow-[0_0_30px_-10px_rgba(34,211,238,0.2)]">
              <h3 className="text-lg font-bold mb-4">Order Summary</h3>
              
              <div className="space-y-2 mb-6">
                {selectedKeys.map(key => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-white/60">{MODULES[key].label} Agent</span>
                    <span>${MODULES[key].rent}</span>
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



