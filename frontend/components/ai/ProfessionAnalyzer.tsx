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
    /* p-2 veya p-3 ile kenarlarda o istediğin "çok az" boşluğu bıraktık */
    <section className="w-full px-2 py-2 sm:px-3 sm:py-3">
      {/* w-full ile dış kutu ekranın tamamına yayıldı */}
      <Card className="w-full border border-gray-700 rounded-xl p-6 md:p-10 bg-[#05070A]">
        
        {/* Başlık ve Açıklama Alanı */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
            Mesleğinize Özel <span className="text-cyan-400">Yapay Zeka Otomasyonları</span>
          </h1>
          <p className="mt-4 text-white/70 text-lg max-w-5xl">
            Kod yazmaya ya da teknik kuruluma gerek yok. CleverAI ile dakikalar içinde otomasyonunuz hazır.
          </p>
          <p className="mt-4 text-cyan-400 font-semibold text-base">
            Özel Otomasyon Analizi Mesleğinizi yazın — "CleverAI Analiz Et" butonuna tıklayın.
          </p>
        </div>

        {/* AI Giriş Alanı - Dış kutunun içinde tam genişlik */}
        <div className="rounded-2xl border border-white/10 bg-[#0D121F] p-6 shadow-xl w-full">
          
          {/* Sonuç Alanı (Sadece analiz sonrası görünür) */}
          {result && (
            <div className="mb-6 overflow-y-auto max-h-[350px] prose prose-invert text-white/90 max-w-none">
              <div dangerouslySetInnerHTML={{ __html: result.summary }} />
            </div>
          )}

          {/* Input ve Buton Satırı */}
          <div className="flex flex-col md:flex-row gap-4">
            <input
              className="flex-1 rounded-xl border border-white/20 bg-black/60 px-5 py-4 text-white text-lg placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              placeholder="Mesleğinizi buraya yazın..."
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
            />
            <Button
              onClick={handleAnalyze}
              disabled={loading}
              className="md:w-64 h-14 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-lg rounded-xl"
            >
              {loading ? "Analiz Ediliyor..." : "CleverAI Analiz Et"}
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
