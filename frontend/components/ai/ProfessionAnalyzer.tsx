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
    /* px-4 ve py-4 ile dört bir yandan eşit ve az boşluk bıraktık */
    <section className="w-full px-4 py-4">
      {/* w-full ile genişliği ekranın tamamına yaydık */}
      <Card className="w-full border border-gray-700 rounded-2xl p-8 md:p-12 bg-[#05070A]">
        
        {/* Üst Metin Alanı */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Mesleğinize Özel <span className="text-cyan-400">Yapay Zeka Otomasyonları</span>
          </h1>
          <p className="mt-6 text-white/70 text-xl max-w-4xl">
            Kod yazmaya ya da teknik kuruluma gerek yok. CleverAI ile dakikalar içinde otomasyonunuz hazır.
          </p>
          <p className="mt-4 text-cyan-400 font-semibold text-lg">
            Özel Otomasyon Analizi Mesleğinizi yazın — "CleverAI Analiz Et" butonuna tıklayın.
          </p>
        </div>

        {/* AI Giriş Alanı - Geniş ve Ferah */}
        <div className="rounded-3xl border border-white/10 bg-[#0D121F] p-8 shadow-2xl w-full">
          
          {/* Sonuç Alanı (Analiz sonrası metin buraya gelecek) */}
          {result && (
            <div className="mb-8 overflow-y-auto max-h-[400px] prose prose-invert text-white/90 max-w-none">
              <div dangerouslySetInnerHTML={{ __html: result.summary }} />
            </div>
          )}

          {/* Input ve Buton Satırı */}
          <div className="flex flex-col md:flex-row gap-4">
            <input
              className="flex-1 rounded-2xl border border-white/20 bg-black/60 px-6 py-5 text-white text-xl placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              placeholder="Mesleğinizi buraya yazın (Örn: Gayrimenkul Danışmanı)..."
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
            />
            <Button
              onClick={handleAnalyze}
              disabled={loading}
              className="md:w-72 h-16 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xl rounded-2xl shadow-lg shadow-cyan-500/20"
            >
              {loading ? "Analiz Ediliyor..." : "CleverAI Analiz Et"}
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
