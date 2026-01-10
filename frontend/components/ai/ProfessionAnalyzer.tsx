import { useState } from "react";
import Button from "../ui/Button";

export default function ProfessionAnalyzer() {
  const [profession, setProfession] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!profession.trim()) return alert("Lütfen mesleğinizi yazın.");
    setLoading(true);
    try {
      const res = await fetch("/api/ai/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profession }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      alert("Hata: " + (err?.message || err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full px-6 py-8 box-border">
      <div className="w-full max-w-full bg-[#0D121F] border border-white/10 rounded-3xl p-8 shadow-lg mx-auto">
        <h1 className="text-4xl font-extrabold text-white mb-4">
          Mesleğinize Özel <span className="text-cyan-400">Yapay Zeka Otomasyonları</span>
        </h1>
        <p className="text-white/80 mb-6">
          Kod yazmaya ya da teknik kuruluma gerek yok. CleverAI ile dakikalar içinde otomasyonunuz hazır.
        </p>
        <p className="text-cyan-400 font-medium mb-8">
          Özel Otomasyon Analizi Mesleğinizi yazın — "CleverAI Analiz Et" butonuna tıklayın.
        </p>

        <div className="flex gap-4 w-full max-w-full">
          <input
            className="flex-1 rounded-2xl border border-white/20 bg-black/40 px-6 py-5 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition text-lg"
            placeholder="Mesleğinizi buraya yazın..."
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
          />
          <Button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-64 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-lg rounded-2xl"
          >
            CleverAI Analiz Et
          </Button>
        </div>
      </div>
    </section>
  );
}
