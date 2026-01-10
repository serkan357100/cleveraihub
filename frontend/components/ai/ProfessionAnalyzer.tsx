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

  const quickTags = ["Emlakçı", "Kuaför", "Hukuk Bürosu", "Klinik", "Restoran"];

  return (
    <section className="mx-auto max-w-6xl px-4 pt-10 pb-6">
      <Card className="p-6 md:p-8">
        {/* Başlık ve Sağ Bilgi Kutusu */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <h1 className="mt-2 text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Mesleğinize Özel <span className="text-cyan-300">Yapay Zeka Otomasyonları</span>
            </h1>
            <p className="mt-4 text-white/60">
              Kod yazmanıza veya teknik kurulumla uğraşmanıza gerek yok. CleverAI sayesinde dakikalar içinde otomasyon sisteminiz hazır.
            </p>

            <p className="mt-3 text-sm text-white/50">
              Mesleğinizi yazın — CleverAI analiz edip size özel otomasyon önerileri oluşturacak.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <input
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 md:flex-1"
                placeholder='Örneğin "Emlakçı", "Diş Hekimi", "Salon Sahibi"...'
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              {quickTags.map((x) => (
                <button
                  key={x}
                  onClick={() => setProfession(x)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/80 hover:bg-white/10"
                >
                  {x}
                </button>
              ))}
            </div>
          </div>

          {/* Sağ kutu: Neler elde edeceksiniz? */}
          <div className="md:w-[420px]">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
              <div className="text-white font-semibold">Neler elde edeceksiniz?</div>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                <li>• <strong>Daha Fazla Nakit:</strong> Potansiyel müşterileri satışa dönüştürme oranınızı artırın.</li>
                <li>• <strong>Zaman Tasarrufu:</strong> Randevu ve takip işlerini otomatikleştirerek gününüzü geri alın.</li>
                <li>• <strong>Azalan İş Yükü:</strong> Tekrarlayan görevler AI tarafından yönetilsin.</li>
                <li>• <strong>Hızlı Aktivasyon:</strong> Teknik bilgi gerektirmeden dakikalar içinde çalışır hale gelin.</li>
              </ul>
              <div className="mt-4 text-xs text-white/50">
                Tipik kurulum süresi: <span className="text-white/70">3–10 dakika</span>
              </div>
            </div>
          </div>
        </div>

        {/* BÜYÜK AI ALANI */}
        <div className="mt-6">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-6 min-h-[260px] flex flex-col">
            {/* İçerik: sonuç yoksa logo & boşluk, sonuç varsa scroll alan */}
            {!result ? (
              <div className="flex h-full flex-col items-center justify-center gap-4">
                {/* Logo (varsa /logo.svg) */}
                <div className="flex items-center justify-center">
                  <img src="/logo.svg" alt="CleverAIHub" className="h-16 w-16 select-none opacity-90" />
                </div>

                <div className="text-center text-white/60 max-w-2xl">
                  <div className="text-lg font-medium text-white/80">CleverAI ile otomasyon önerinizi görün</div>
                  <div className="mt-2 text-sm">
                    Mesleğinizi yazıp <span className="font-semibold text-cyan-300">Clever Analiz Et</span> butonuna tıkladığınızda,
                    AI size özel otomasyon önerilerini ve gereken adımları gösterecek.
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-full flex-col">
                <div className="flex items-start justify-between">
                  <div className="text-white font-semibold text-lg">{result.title || "Öneriler"}</div>
                  <button
                    onClick={() => setResult(null)}
                    className="text-xs text-white/60 hover:text-white"
                  >
                    Sıfırla
                  </button>
                </div>

                <div className="mt-3 flex-1 overflow-auto pr-2">
                  {/* AI'dan gelen ham metni veya yapılandırılmış sonucu göster */}
                  <div className="prose prose-invert max-w-none text-sm text-white/80">
                    {/* Eger API ham structure farklıysa bunu adapte edebilirsin */}
                    {result?.summary ? (
                      <div dangerouslySetInnerHTML={{ __html: result.summary }} />
                    ) : (
                      <pre className="whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
                    )}
                  </div>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="text-sm font-semibold text-white">Otomasyonlar</div>
                    <div className="mt-2 space-y-1 text-sm text-white/70">
                      {Array.isArray(result.automations) && result.automations.length > 0 ? (
                        result.automations.map((a: string, i: number) => <div key={i}>• {a}</div>)
                      ) : (
                        <div className="text-white/50">Öğe yok.</div>
                      )}
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="text-sm font-semibold text-white">Sizden gerekenler</div>
                    <div className="mt-2 space-y-1 text-sm text-white/70">
                      {Array.isArray(result.missingInfoNeeded) && result.missingInfoNeeded.length > 0 ? (
                        result.missingInfoNeeded.map((m: string, i: number) => <div key={i}>• {m}</div>)
                      ) : (
                        <div className="text-white/50">Öğe yok.</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input ve Buton (AI alanının altında sabit) */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
              placeholder='Mesleğinizi yazın: "Emlakçı", "Diş Hekimi"...'
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
            />
            <Button onClick={handleAnalyze} className="sm:w-[220px]">
              {loading ? "Analiz ediliyor..." : "Clever Analiz Et"}
            </Button>
          </div>
        </div>

        {/* Alt: sonuç varsa paket başlat butonları - (köprü) */}
        {result && (
          <div className="mt-4 flex gap-2">
            <Link href="/packages/1" className="flex-1">
              <Button className="w-full">Paket Başlat</Button>
            </Link>
            <Link href="/packages">
              <Button variant="secondary">Pazaryeri</Button>
            </Link>
          </div>
        )}
      </Card>
    </section>
  );
}
