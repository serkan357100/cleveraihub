import { useState } from "react";
import Button from "../ui/Button";

export default function FullScreenProfessionAnalyzer() {
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
    <div className="w-screen h-screen bg-[#0D121F] flex flex-col justify-center items-center p-8">
      <h1 className="text-5xl font-extrabold text-white mb-6 text-center max-w-4xl">
        Mesleğinize Özel <span className="text-cyan-400">Yapay Zeka Otomasyonları</span>
      </h1>
      <p className="text-white/80 text-xl mb-4 max-w-3xl text-center">
        Kod yazmaya ya da teknik kuruluma gerek yok. CleverAI ile dakikalar içinde otomasyonunuz hazır.
      </p>
      <p className="text-cyan-400 font-semibold text-lg mb-12 text-center max-w-3xl">
        Özel Otomasyon Analizi Mesleğinizi yazın — "CleverAI Analiz Et" butonuna tıklayın.
      </p>

      <div className="w-full max-w-4xl flex gap-6">
        <input
          className="flex-1 rounded-xl border border-white/20 bg-black/40 px-6 py-5 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition text-lg"
          placeholder="Mesleğinizi buraya yazın (Örn: Gayrimenkul Danışmanı)..."
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
        />
        <Button
          onClick={handleAnalyze}
          disabled={loading}
          className="w-64 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-lg"
        >
          CleverAI Analiz Et
        </Button>
      </div>
    </div>
  );
}
