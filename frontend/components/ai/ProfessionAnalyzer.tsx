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
    <section className="mx-auto max-w-5xl px-4 py-8">
      <Card className="p-6 md:p-8 border border-gray-700 rounded-lg">
        {/* Başlık ve açıklama - kutusuz, geniş metin */}
        <div className="mb-6">
          <h1 className="text-4xl font-extrabold text-white leading-tight max-w-full">
            Mesleğinize Özel <span className="text-cyan-400">Yapay Zeka Otomasyonları</span>
          </h1>
          <p className="mt-4 text-white/80 text-lg max-w-full">
            Kod yazmaya ya da teknik kuruluma gerek yok. CleverAI ile dakikalar içinde otomasyonunuz hazır.
          </p>
          <p className="mt-2 text-cyan-400 font-medium max-w-full">
            Mesleğinizi yazın — CleverAI size anında paket halinde hazırlasın.
          </p>
        </div>

        {/* AI Alanı - Başlığın hemen altında, kutu şeklinde */}
        <div className="rounded-3xl border border-white/10 bg-[#0D121F] p-8 shadow-lg">
          {/* Başlık ve reset */}
          <div className="flex items-center gap-4 mb-6">
            <img
              src="/logo.svg"
              alt="CleverAI"
              className="h-12 w-12"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            <h2 className="text-white font-bold text-2xl flex-1">
              {result?.title || "Özel Otomasyon Analizi"}
            </h2>
            {result && (
              <button
                onClick={() => setResult(null)}
                className="rounded-lg bg-white/10 px-3 py-1 text-xs text-white/70 hover:bg-white/20 transition"
              >
                Yeni Analiz
              </button>
            )}
          </div>

          {/* Sonuçlar scrollable */}
          <div className="max-h-[320px] overflow-y-auto prose prose-invert text-white/90 mb-4">
            {!result ? (
              <div className="text-center text-white/60 py-8">
                <p className="text-lg font-medium">Mesleğinizi yazın ve "Clever Analiz Et" butonuna tıklayın.</p>
                <p className="mt-2 text-sm">AI önerileri, gereksinimler ve hızlı kurulum adımları burada gösterilecek.</p>
              </div>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: result.summary }} />
            )}
          </div>

          {/* Önerilen modüller ve gereksinimler kutu içinde */}
          {result && (
            <div className="grid grid-cols-2 gap-6 text-white/80 text-sm mb-4">
              <div className="rounded-xl border border-white/20 bg-white/5 p-4">
                <h3 className="font-semibold mb-2 text-cyan-400">Önerilen Modüller</h3>
                {Array.isArray(result.automations) && result.automations.length > 0 ? (
                  result.automations.map((a: string, i: number) => <div key={i}>• {a}</div>)
                ) : (
                  <div>Modül bulunamadı.</div>
                )}
              </div>
              <div className="rounded-xl border border-white/20 bg-white/5 p-4">
                <h3 className="font-semibold mb-2 text-orange-400">Gereksinimler</h3>
                {Array.isArray(result.missingInfoNeeded) && result.missingInfoNeeded.length > 0 ? (
                  result.missingInfoNeeded.map((m: string, i: number) => <div key={i}>• {m}</div>)
                ) : (
                  <div>Ek bilgi yok</div>
                )}
              </div>
            </div>
          )}

          {/* Input ve Buton */}
          <div className="flex gap-4">
            <input
              className="flex-1 rounded-xl border border-white/20 bg-black/40 px-5 py-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              placeholder='Mesleğinizi yazın (Örn: Emlakçı, Diş Hekimi)...'
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleAnalyze(); }}
            />
            <Button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-48 bg-cyan-500 hover:bg-cyan-400 text-black font-bold"
            >
              {loading ? "Analiz Ediliyor..." : "Clever Analiz Et"}
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
