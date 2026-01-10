import { useState } from "react";
import Button from "../ui/Button";

export default function FullScreenContainer() {
  const [profession, setProfession] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!profession.trim()) return alert("Lütfen mesleğinizi yazın.");
    setLoading(true);
    try {
      // API çağrısı burada olacak
      // ...
    } catch {
      // Hata yönetimi
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#0D121F] p-4 box-border">
      <div className="w-full h-full bg-[#121827] rounded-2xl p-8 flex flex-col justify-center max-w-[1920px] mx-auto">
        <h1 className="text-5xl font-extrabold text-white mb-6 text-center">
          Mesleğinize Özel <span className="text-cyan-400">Yapay Zeka Otomasyonları</span>
        </h1>
        <p className="text-white/80 text-xl mb-4 text-center">
          Kod yazmaya ya da teknik kuruluma gerek yok. CleverAI ile dakikalar içinde otomasyonunuz hazır.
        </p>
        <p className="text-cyan-400 font-semibold text-lg mb-12 text-center">
          Özel Otomasyon Analizi Mesleğinizi yazın — "CleverAI Analiz Et" butonuna tıklayın.
        </p>

        <div className="flex gap-6 max-w-4xl mx-auto">
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
    </div>
  );
}
