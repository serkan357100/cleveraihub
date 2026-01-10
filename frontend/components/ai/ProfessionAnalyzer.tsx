import React from "react";
import Button from "../ui/Button";

export default function FullHeroWithPackages() {
  return (
    <div className="min-h-screen w-screen bg-[#0D121F] text-white">
      {/* ---------- DIŞ KUTU (FULL-BLEED HERO) ---------- */}
      <header className="w-full box-border p-3"> {/* p-3 ile dört yandan çok az boşluk */}
        <div className="w-full bg-[#0F1720] border border-white/10 rounded-2xl p-8 md:p-10 shadow-lg">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
            Mesleğinize Özel <span className="text-cyan-400">Yapay Zeka Otomasyonları</span>
          </h1>

          <p className="mt-4 text-white/80 max-w-3xl">
            Kod yazmaya ya da teknik kuruluma gerek yok. CleverAI ile dakikalar içinde otomasyonunuz hazır.
          </p>

          {/* Tek satır metin (isteğine göre) */}
          <p className="mt-4 text-cyan-400 font-medium">
            Özel Otomasyon Analizi Mesleğinizi yazın — "CleverAI Analiz Et" butonuna tıklayın.
          </p>

          {/* Input+Buton Taşıyan Koyu İç Kutucuk (Full width içeride) */}
          <div className="mt-8 rounded-xl bg-[#0B0F14] border border-white/6 p-4">
            <div className="flex gap-4 items-center">
              <input
                className="flex-1 rounded-lg bg-[#07090b] border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                placeholder="Mesleğinizi buraya yazın (Örn: Emlakçı, Diş Hekimi)..."
              />
              <Button className="w-44 md:w-56 bg-cyan-400 hover:bg-cyan-300 text-black font-semibold">
                CleverAI Analiz Et
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* ---------- HERO'YU TAM EKRAN YAPMAK İÇİN BOŞLUK BIRAK (min-h-screen zaten yaptı) ---------- */}
      {/* Eğer hero'nun kesinlikle tam viewport'u kaplamasını istiyorsan, sarmalayıcıyı min-h-screen yap. */}

      {/* ---------- YENİ BÖLÜM: ÖNE ÇIKAN PAKETLER (HER OLMASI GEREKTİĞİ YERDE BAŞLAR) ---------- */}
      <section className="w-full bg-transparent py-12 px-6"> {/* packages section artık hero'nun altında */}
        <div className="max-w-[1200px] mx-auto"> {/* paket kartlarını ortalıyoruz */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold">Öne Çıkan Paketler</h2>
              <p className="text-white/70 mt-2">Dakikalar içinde etkinleştirebileceğiniz önceden hazırlanmış otomasyon paketleri.</p>
            </div>
            <div>
              <button className="rounded-md bg-[#1f2937] border border-white/10 px-4 py-2 text-sm text-white/90">Tümünü görüntüle</button>
            </div>
          </div>

          {/* Paket Kartları (örnek) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Kart 1 */}
            <article className="rounded-xl border border-white/6 bg-[#0B1014] p-6">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-bold">Başlangıç</h3>
                <span className="text-xs bg-cyan-900/40 px-2 py-1 rounded-full text-cyan-200">En Popüler</span>
              </div>
              <div className="mt-4 text-sm text-white/80">29$/ay</div>
              <p className="mt-4 text-white/70">Hızlı yanıt için WhatsApp + CRM temel bilgileri.</p>
              <div className="mt-4 flex gap-2 text-xs text-white/80">
                <span className="px-2 py-1 bg-white/5 rounded">WhatsApp</span>
                <span className="px-2 py-1 bg-white/5 rounded">CRM</span>
                <span className="px-2 py-1 bg-white/5 rounded">Takip</span>
              </div>
              <div className="mt-6 flex gap-3">
                <button className="px-3 py-2 rounded-md bg-[#111827] border border-white/6 text-sm">Başlangıç</button>
                <button className="ml-auto px-3 py-2 rounded-md bg-cyan-500 text-black font-medium text-sm">Detaylar</button>
              </div>
            </article>

            {/* Kart 2 */}
            <article className="rounded-xl border border-white/6 bg-[#0B1014] p-6">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-bold">Profesyonel</h3>
                <span className="text-xs bg-cyan-900/40 px-2 py-1 rounded-full text-cyan-200">Büyüme İçin</span>
              </div>
              <div className="mt-4 text-sm text-white/80">59$/ay</div>
              <p className="mt-4 text-white/70">Potansiyel müşteri kaydı + takip + randevu planlama.</p>
              <div className="mt-4 flex gap-2 text-xs text-white/80">
                <span className="px-2 py-1 bg-white/5 rounded">WhatsApp</span>
                <span className="px-2 py-1 bg-white/5 rounded">CRM</span>
                <span className="px-2 py-1 bg-white/5 rounded">Randevular</span>
              </div>
              <div className="mt-6 flex gap-3">
                <button className="px-3 py-2 rounded-md bg-[#111827] border border-white/6 text-sm">Başlangıç</button>
                <button className="ml-auto px-3 py-2 rounded-md bg-cyan-500 text-black font-medium text-sm">Detaylar</button>
              </div>
            </article>

            {/* Kart 3 */}
            <article className="rounded-xl border border-white/6 bg-[#0B1014] p-6">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-bold">Gelişmiş</h3>
                <span className="text-xs bg-cyan-900/40 px-2 py-1 rounded-full text-cyan-200">Ölçek</span>
              </div>
              <div className="mt-4 text-sm text-white/80">99$/ay</div>
              <p className="mt-4 text-white/70">Gelişmiş otomasyon, çok kanallı entegrasyon ve özelleştirme.</p>
              <div className="mt-4 flex gap-2 text-xs text-white/80">
                <span className="px-2 py-1 bg-white/5 rounded">WhatsApp</span>
                <span className="px-2 py-1 bg-white/5 rounded">CRM</span>
                <span className="px-2 py-1 bg-white/5 rounded">Mail</span>
              </div>
              <div className="mt-6 flex gap-3">
                <button className="px-3 py-2 rounded-md bg-[#111827] border border-white/6 text-sm">Başlangıç</button>
                <button className="ml-auto px-3 py-2 rounded-md bg-cyan-500 text-black font-medium text-sm">Detaylar</button>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
