import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Link from "next/link";

const MODULES: any = {
  whatsapp: { label: "WhatsApp", rent: 20, buy: 150 },
  crm: { label: "CRM", rent: 15, buy: 100 },
  lead: { label: "Lead", rent: 10, buy: 70 },
  appointments: { label: "Appointments", rent: 14, buy: 80 },
  followup: { label: "Follow-up", rent: 10, buy: 50 },
};

export default function PackageDetail() {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([
    "whatsapp",
    "crm",
    "followup",
  ]);

  const [monthly, setMonthly] = useState(0);
  const [buy, setBuy] = useState(0);

  // ✅ FİYATLARI HER DEĞİŞİMDE YENİDEN HESAPLA
  useEffect(() => {
    let m = 0;
    let b = 0;

    selectedKeys.forEach((key) => {
      m += MODULES[key].rent;
      b += MODULES[key].buy;
    });

    setMonthly(m);
    setBuy(b);
  }, [selectedKeys]);

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
        <Link href="/packages" className="text-cyan-400 text-sm">
          ← Back to Marketplace
        </Link>

        <div className="grid gap-8 md:grid-cols-3 mt-6">
          <div className="md:col-span-2 space-y-6">
            <h1 className="text-4xl font-bold">
              Package Configuration
            </h1>

            <Card className="p-6">
              {Object.keys(MODULES).map((key) => (
                <div
                  key={key}
                  onClick={() => toggleModule(key)}
                  className={`p-4 mb-3 rounded-xl border cursor-pointer ${
                    selectedKeys.includes(key)
                      ? "border-cyan-500 bg-cyan-500/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  {MODULES[key].label} (+${MODULES[key].rent}/mo)
                </div>
              ))}
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">
              Order Summary
            </h3>

            <div className="mb-4">
              Monthly Rent:
              <div className="text-2xl text-cyan-400 font-bold">
                ${monthly}/mo
              </div>
            </div>

            <div className="mb-6">
              One-time Buy:
              <div className="text-xl font-bold">
                ${buy}
              </div>
            </div>

            <Button
              className="w-full"
              onClick={() => {
                localStorage.setItem(
                  "checkout_data",
                  JSON.stringify({
                    monthly,
                    buy,
                  })
                );
                window.location.href = "/checkout";
              }}
            >
              Start 2-Day Free Demo
            </Button>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
