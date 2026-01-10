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
      const res = await fetch("https://cleveraihub-8.onrender.com/api/ai/recommend", {
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
        {/* Başlık ve Yan Kutu - Aynı Yükseklik ve Genişlikte */}
        <div className="flex gap-6 mb-6">
          {/* Başlık ve açıklamalar */}
          <div className="flex-1 flex flex-col justify-center border border-transparent" style={{ minHeight: '160px' }}>
            <h1 className="text-4xl font-extrabold text-white leading-tight">
              Mesleğinize Özel <span className="text-cyan-400">Yapay Zeka Otomasyonları</span>
            </h1>
            <p className="mt-4 text-white/80 text-lg max-w-xl">
              Kod yazmanıza veya teknik kurulumla uğraşmanıza gerek yok. CleverAI sayesinde dakikalar içinde otomasyon sisteminiz hazır.
            </p>
            <p className="mt-2 text-cyan-400 font-medium max-w-xl">
              Mesleğinizi yazın — CleverAI analiz edip size özel otomasyon önerileri oluşturacak.
            </p>
          </div>

          {/* Yan kutu - Başlıkla aynı yükseklikte ve genişlikte */}
          <div
            className="w-80 rounded-2xl border border-white/10 bg-black/30 p-6 text-white/80 text-sm flex flex-col justify-center"
            style={{ minHeight: '160px' }}
          >
            <h2 className="font-semibold text-lg mb-4">Neler elde edeceksiniz?</h2>
            <ul className="space-y-2">
              <li>🚀 <strong>Daha Fazla Nakit:</strong> Potansiyel müşterileri satışa dönüştürme oranınızı artırın.</li>
              <li>🕒 <strong>Zaman Tasarrufu:</strong> Randevu ve takip işlerini otomatikleştirerek gününüzü geri alın.</li>
              <li>🤖 <strong>Azalan İş Yükü:</strong> Tekrarlayan görevler AI tarafından yönetilsin.</li>
              <li>⚡ <strong>Hızlı Aktivasyon:</strong> Teknik bilgi gerektirmeden dakikalar içinde çalışır hale gelin.</li>
            </ul>
            <div className="mt-4 text-xs text-white/50 flex justify-between">
              <span>Tipik kurulum süresi:</span>
              <span className="text-cyan-300 font-bold">3–10 dakika</span>
            </div>
          </div>
        </div>

        {/* AI Alanı - Başlık ve Yan Kutunun hemen altında */}
        <div className="rounded-3xl border border-white/10 bg-[#0D121F] p-8 shadow-lg">
          {/* AI Başlık ve Reset */}
          <div className="flex items-center gap-4 mb-6">
            <img src="/logo.svg" alt="CleverAI" className="h-12 w-12" />
            <h2 className="text-white font-bold text-2xl flex-1">{result?.title || "Özel Otomasyon Analizi"}</h2>
            {result && (
              <button
                onClick={() => setResult(null)}
                className="rounded-lg bg-white/10 px-3 py-1 text-xs text-white/70 hover:bg-white/20 transition"
              >
                Yeni Analiz
              </button>
            )}
          </div>

          {/* AI Sonuç Metni */}
          <div className="max-h-[300px] overflow-y-auto prose prose-invert max-w-none text-white/90 leading-relaxed mb-4">
            {!result ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-white/60 px-4">
                <div>
                  <p className="text-lg font-medium">Mesleğinizi yazın ve "Clever Analiz Et" butonuna tıklayın.</p>
                  <p className="mt-2 text-sm">AI önerileri, gerekli bilgiler ve hızlı kurulum adımları burada listelenecek.</p>
                </div>
              </div>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: result.summary }} />
            )}
          </div>

          {/* Önerilen modüller ve gereksinimler */}
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
                  <div>Ek bilgi gerekmiyor.</div>
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
              onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
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
