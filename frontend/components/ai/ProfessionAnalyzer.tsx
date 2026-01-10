import { useState } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";

/**
 * Önemli: HEADER_HEIGHT ile başlık + yan kutu yüksekliğini kontrol edebilirsin.
 * İstediğin tam pikseli yaz: örn: '200px' veya '180px'
 */
const HEADER_HEIGHT = "200px";

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
    <section className="mx-auto max-w-7xl px-6 py-8">
      <Card className="p-6 md:p-8">

        {/* ---------- HEADER ROW: iki KUTU BİREBİR AYNI BOYDA ---------- */}
        <div
          className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6"
          style={{ alignItems: "stretch" }}
        >
          {/* Sol: Başlık kutusu (SABİT YÜKSEKLİK) */}
          <div
            className="rounded-2xl border border-white/10 bg-black/30 p-6"
            style={{ height: HEADER_HEIGHT, display: "flex", flexDirection: "column", justifyContent: "center" }}
          >
            <h1 className="text-4xl font-extrabold text-white leading-tight">
              Mesleğinize Özel <span className="text-cyan-400">Yapay Zeka Otomasyonları</span>
            </h1>
            <p className="mt-3 text-white/80 text-lg max-w-xl">
              Kod yazmana ya da teknik kuruluma gerek yok. CleverAI ile dakikalar içinde otomasyonun hazır.
            </p>
            <p className="mt-2 text-cyan-400 font-medium max-w-xl">
              Mesleğinizi yazın — CleverAI size anında paket önerisi hazırlasın.
            </p>
          </div>

          {/* Sağ: Yan kısa kutu (AYNI SABİT YÜKSEKLİK) */}
          <div
            className="rounded-2xl border border-white/10 bg-black/30 p-6 text-white/80"
            style={{ height: HEADER_HEIGHT, display: "flex", flexDirection: "column", justifyContent: "center" }}
          >
            <h2 className="font-semibold text-lg mb-2">Neler elde edeceksiniz?</h2>
            <ul className="text-sm space-y-2">
              <li>🚀 <strong>Daha Fazla Nakit:</strong> Potansiyel müşterileri satışa dönüştürün.</li>
              <li>🕒 <strong>Zaman Tasarrufu:</strong> Randevu ve takip işlerini otomatikleştirin.</li>
              <li>🤖 <strong>Azalan İş Yükü:</strong> Tekrarlayan görevler AI tarafından yönetilsin.</li>
              <li>⚡ <strong>Hızlı Aktivasyon:</strong> Teknik bilgi gerektirmez, dakikalar içinde çalışır.</li>
            </ul>
            <div className="mt-3 text-xs text-white/50 flex justify-between">
              <span>Tipik kurulum süresi:</span>
              <span className="text-cyan-300 font-bold">3–10 dakika</span>
            </div>
          </div>
        </div>

        {/* ---------- AI ALANI: HEADER'IN HEMEN ALTINDA, BOŞLUK YOK ---------- */}
        <div className="mt-0"> {/* mt-0 ile boşluk kaldırıldı */}
          <div className="rounded-3xl border border-white/10 bg-[#0D121F] p-8 shadow-lg">
            {/* Üst: küçük başlık + logo */}
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

            {/* Sonuçlar (scrollable olmalı ama AI alanı tam görünür) */}
            <div className="max-h-[360px] overflow-y-auto prose prose-invert text-white/90 mb-4">
              {!result ? (
                <div className="text-center text-white/60 py-8">
                  <p className="text-lg font-medium">Mesleğinizi yazın ve "Clever Analiz Et" butonuna tıklayın.</p>
                  <p className="mt-2 text-sm">AI önerileri, gereksinimler ve hızlı kurulum adımları burada gösterilecek.</p>
                </div>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: result.summary }} />
              )}
            </div>

            {/* Önerilen modüller / gereksinimler */}
            {result && (
              <div className="grid grid-cols-2 gap-4 text-white/80 text-sm mb-4">
                <div className="rounded-xl border border-white/20 bg-white/5 p-3">
                  <div className="font-semibold text-cyan-400 mb-2">Önerilen Modüller</div>
                  {Array.isArray(result.automations) ? result.automations.map((a: string, i: number) => <div key={i}>• {a}</div>) : <div>Modül yok</div>}
                </div>
                <div className="rounded-xl border border-white/20 bg-white/5 p-3">
                  <div className="font-semibold text-orange-400 mb-2">Gereksinimler</div>
                  {Array.isArray(result.missingInfoNeeded) ? result.missingInfoNeeded.map((m: string, i: number) => <div key={i}>• {m}</div>) : <div>Ek bilgi yok</div>}
                </div>
              </div>
            )}

            {/* Input + Buton (her zaman görünür) */}
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
        </div>
      </Card>
    </section>
  );
}
