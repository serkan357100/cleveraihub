import { useState } from "react";
import Link from "next/link";
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
    <section className="mx-auto max-w-6xl px-4 pt-10 pb-6">
      <Card className="p-6 md:p-8">
        {/* Üst Kısım: Başlık ve Sağdaki Kutucuk */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between border-b border-white/5 pb-8">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Mesleğinize Özel <span className="text-cyan-300">Yapay Zeka Otomasyonları</span>
            </h1>
            <p className="mt-4 text-lg text-white/80">
              Kod yazmanıza veya teknik kurulumla uğraşmanıza gerek yok. CleverAI sayesinde dakikalar içinde otomasyon sisteminiz hazır.
            </p>
            <p className="mt-4 text-sm text-cyan-400/80 font-medium">
              Mesleğinizi yazın — CleverAI analiz edip size özel otomasyon önerileri oluşturacak.
            </p>
          </div>

          <div className="md:w-[420px]">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-6 shadow-xl">
              <div className="text-white font-bold text-lg border-b border-white/10 pb-2 mb-3">Neler elde edeceksiniz?</div>
              <ul className="space-y-3 text-sm text-white/80">
                <li className="flex gap-2">
                  <span className="text-cyan-400">🚀</span>
                  <span><strong>Daha Fazla Nakit:</strong> Potansiyel müşterileri satışa dönüştürme oranınızı artırın.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan-400">🕒</span>
                  <span><strong>Zaman Tasarrufu:</strong> Randevu ve takip işlerini otomatikleştirerek gününüzü geri alın.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan-400">🤖</span>
                  <span><strong>Azalan İş Yükü:</strong> Tekrarlayan görevler AI tarafından yönetilsin.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan-400">⚡</span>
                  <span><strong>Hızlı Aktivasyon:</strong> Teknik bilgi gerektirmeden dakikalar içinde çalışır hale gelin.</span>
                </li>
              </ul>
              <div className="mt-4 pt-3 border-t border-white/5 text-xs text-white/50 flex justify-between">
                <span>Tipik kurulum süresi:</span>
                <span className="text-cyan-300 font-bold">3–10 dakika</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Etkileşim Alanı */}
        <div className="mt-8">
          <div className="rounded-3xl border border-white/10 bg-[#0D121F] p-8 min-h-[350px] flex flex-col shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[80px] pointer-events-none" />

            {!result ? (
              <div className="flex h-full flex-1 flex-col items-center justify-center text-center gap-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan-400/20 blur-2xl rounded-full" />
                  <img src="/logo.svg" alt="CleverAI" className="relative h-24 w-24 opacity-90" />
                </div>
                <div className="max-w-md">
                  <h3 className="text-xl font-semibold text-white">CleverAI Analizine Hazır</h3>
                  <p className="mt-2 text-white/50 text-sm">
                    Aşağıdaki alana mesleğinizi yazın ve "Clever Analiz Et" butonuna basın. 
                    Yapay zeka sizin için en karlı senaryoları burada listeleyecek.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex h-full flex-col flex-1">
                <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                  <img src="/logo.svg" alt="AI" className="h-10 w-10" />
                  <div>
                    <div className="text-white font-bold text-xl">{result.title || "Özel Otomasyon Analizi"}</div>
                    <div className="text-cyan-400 text-xs font-medium">CleverAI Tarafından Oluşturuldu</div>
                  </div>
                  <button
                    onClick={() => setResult(null)}
                    className="ml-auto rounded-lg bg-white/5 px-3 py-1 text-xs text-white/60 hover:bg-white/10 hover:text-white transition-all"
                  >
                    Yeni Analiz
                  </button>
                </div>

                <div className="flex-1 overflow-auto pr-2 custom-scrollbar">
                  <div className="prose prose-invert max-w-none text-base text-white/90 leading-relaxed">
                    {result?.summary ? (
                      <div dangerouslySetInnerHTML={{ __html: result.summary }} />
                    ) : (
                      <div className="flex gap-3">
                         <span className="text-cyan-400 font-bold">AI:</span>
                         <p>{JSON.stringify(result)}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-8 grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
                      <div className="flex items-center gap-2 text-cyan-300 font-bold mb-3">
                        <span>⚙️</span> Önerilen Modüller
                      </div>
                      <div className="space-y-2 text-sm text-white/70">
                        {Array.isArray(result.automations) ? result.automations.map((a: any, i: number) => (
                          <div key={i} className="flex gap-2"><span>•</span> {a}</div>
                        )) : "Modül bulunamadı."}
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
                      <div className="flex items-center gap-2 text-orange-300 font-bold mb-3">
                        <span>📝</span> Gereksinimler
                      </div>
                      <div className="space-y-2 text-sm text-white/70">
                        {Array.isArray(result.missingInfoNeeded) ? result.missingInfoNeeded.map((m: any, i: number) => (
                          <div key={i} className="flex gap-2"><span>•</span> {m}</div>
                        )) : "Ek bilgi gerekmiyor."}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex gap-4">
                   <Link href="/packages" className="flex-1">
                      <Button className="w-full py-4 text-lg shadow-lg shadow-cyan-500/20">Hemen Paketi Başlat</Button>
                   </Link>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <input
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-6 py-5 text-white text-lg placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                placeholder='Mesleğinizi buraya yazın (Örn: Gayrimenkul Danışmanı)...'
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
              />
            </div>
            <Button 
              onClick={handleAnalyze} 
              className="sm:w-[260px] py-5 text-xl font-bold bg-cyan-500 hover:bg-cyan-400 text-black transition-all"
              disabled={loading}
            >
              {loading ? "Analiz Ediliyor..." : "Clever Analiz Et"}
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
