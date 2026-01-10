import { useState } from "react";
import Card from "../ui/Card";
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
    <section className="mx-auto max-w-full px-4 py-8">
      <Card className="p-8 border border-gray-700 rounded-lg w-full max-w-full">
        {/* Başlık ve açıklama */}
        <div className="mb-6 max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold text-white leading-tight">
            Mesleğinize Özel <span className="text-cyan-400">Yapay Zeka Otomasyonları</span>
          </h1>
          <p className="mt-4 text-white/80 text-lg">
            Kod yazmaya ya da teknik kuruluma gerek yok. CleverAI ile dakikalar içinde otomasyonunuz hazır.
          </p>
          <p className="mt-4 text-cyan-400 font-medium text-lg">
            Özel Otomasyon Analizi Mesleğinizi yazın — "CleverAI Analiz Et" butonuna tıklayın.
          </p>
        </div>

        {/* AI Konuşma Alanı */}
        <div className="rounded-3xl border border-white/10 bg-[#0D121F] p-10 shadow-lg w-full max-w-5xl mx-auto">
          {/* Sonuç alanı (varsa) */}
          {result && (
            <div className="mb-8 overflow-y-auto max-h-[400px] prose prose-invert text-white/90">
              <div dangerouslySetInnerHTML={{ __html: result.summary }} />
            </div>
          )}

          {/* Input ve Buton */}
          <div className="flex gap-6">
            <input
              className="flex-1 rounded-xl border border-white/20 bg-black/40 px-6 py-5 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition text-lg"
              placeholder='Mesleğinizi buraya yazın...'
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
      </Card>
    </section>
  );
}
