import { useState } from "react";
import Button from "../ui/Button";

export default function ProfessionAnalyzer() {
  const [profession, setProfession] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!profession.trim()) return alert("Lütfen mesleğinizi yazın.");
    setLoading(true);
    try {
      // API çağrısı burada olacak
    } catch {
      // Hata yönetimi
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#0D121F] p-4 box-border flex items-center justify-center">
      <div className="w-full max-w-5xl bg-[#121827] border border-white/20 rounded-2xl p-8">
        <h1 className="text-4xl font-extrabold text-white mb-4">
          Mesleğinize Özel <span className="text-cyan-400">Yapay Zeka Otomasyonları</span>
        </h1>
        <p className="text-white/80 mb-6">
          Kod yazmaya ya da teknik kuruluma gerek yok. CleverAI ile dakikalar içinde otomasyonunuz hazır.
        </p>
        <p className="text-cyan-400 font-medium mb-8">
          Özel Otomasyon Analizi Mesleğinizi yazın — "CleverAI Analiz Et" butonuna tıklayın.
        </p>

        <div className="flex gap-4">
          <input
            className="flex-1 rounded-lg border border-white/20 bg-black/40 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
            placeholder="Mesleğinizi buraya yazın (Örn: Gayrimenkul Danışmanı)..."
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
          />
          <Button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-40 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold"
          >
            CleverAI Analiz Et
          </Button>
        </div>
      </div>
    </div>
  );
}
