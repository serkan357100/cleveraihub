import React, { useState, useEffect, useRef } from "react";

// Ortak Buton Bileşeni
function Button({ children, onClick, className }: { children: React.ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={`bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-2 rounded-lg transition-all active:scale-95 ${className ?? ""}`}
    >
      {children}
    </button>
  );
}

export default function CleverAIHubFullSite() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content: "Merhaba, ben CleverAI; mesleğinize özel otomasyon paketlerini kodlama veya teknik kurulum gerekmeden hazırlarım.",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "ai", content: "Analiz tamamlandı. Sizin için en uygun paketleri aşağıda listeledim." }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500/30">
      
      {/* 1. NAVBAR */}
      <nav className="fixed top-0 w-full h-20 bg-black/80 backdrop-blur-md border-b border-white/10 z-50 flex items-center justify-between px-8">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center text-black font-black text-xl">C</div>
          <span className="text-2xl font-bold tracking-tighter">CleverAI<span className="text-cyan-400">Hub</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <a href="#market" className="hover:text-cyan-400 transition">Market</a>
          <a href="#packages" className="hover:text-cyan-400 transition">Paketler</a>
          <a href="#dashboard" className="hover:text-cyan-400 transition">Panel</a>
          <Button className="text-sm">Giriş Yap</Button>
        </div>
      </nav>

      {/* 2. HERO & CHAT SECTION */}
      <section className="relative h-screen flex flex-col items-center pt-32">
        <div className="text-center z-10 mb-10">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
            Mesleğinize Özel <span className="text-cyan-400">Yapay Zeka Otomasyonları</span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Kod yazmaya gerek yok. CleverAI ile otomasyonunuz dakikalar içinde hazır.
          </p>
        </div>

        {/* CHAT PANEL */}
        <div className="w-[90vw] max-w-5xl bg-[#0D121F] border border-white/10 rounded-3xl shadow-2xl flex flex-col h-[55vh] overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl text-lg ${msg.role === "user" ? "bg-cyan-600 text-white" : "bg-white/5 border border-white/10 text-white/90"}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 bg-black/20 border-t border-white/5 flex gap-3">
            <input
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              placeholder="Mesleğinizi yazın..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <Button onClick={handleSend}>Gönder</Button>
          </div>
        </div>
      </section>

      {/* 3. MARKET SECTION */}
      <section id="market" className="py-24 px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
          <span className="w-2 h-8 bg-cyan-500 rounded-full"></span> Popüler Market Modülleri
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["WhatsApp Agent", "CRM Sync", "Lead Generator"].map((item) => (
            <div key={item} className="bg-[#0D121F] border border-white/10 p-8 rounded-3xl hover:border-cyan-500/50 transition group">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition">AI</div>
              <h3 className="text-xl font-bold mb-2">{item}</h3>
              <p className="text-white/50 mb-6 text-sm">İşletmeniz için tam otomatik {item.toLowerCase()} çözümü.</p>
              <Button className="w-full bg-white/5 text-white hover:bg-cyan-500 hover:text-black">İncele</Button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PACKAGES SECTION */}
      <section id="packages" className="py-24 bg-[#05070A]">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-black mb-16">Hazır Paketler</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Başlangıç", price: "$29", features: ["WhatsApp Modülü", "Temel CRM"] },
              { name: "Profesyonel", price: "$59", features: ["WhatsApp + CRM", "Lead Takip", "E-posta"] },
              { name: "Enterprise", price: "$99", features: ["Tüm Modüller", "7/24 Destek", "Özel AI"] },
            ].map((pkg) => (
              <div key={pkg.name} className={`p-10 rounded-[2.5rem] border ${pkg.name === "Profesyonel" ? "border-cyan-500 bg-cyan-500/5 scale-105" : "border-white/10 bg-[#0D121F]"}`}>
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <div className="text-4xl font-black text-cyan-400 mb-6">{pkg.price}<span className="text-sm text-white/50">/ay</span></div>
                <ul className="text-left space-y-4 mb-8 text-white/70">
                  {pkg.features.map(f => <li key={f}>✓ {f}</li>)}
                </ul>
                <Button className="w-full">Hemen Başla</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DASHBOARD PREVIEW */}
      <section id="dashboard" className="py-24 px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-cyan-900/20 to-transparent border border-cyan-500/20 rounded-[3rem] p-12 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-4xl font-black mb-6">Yönetim Paneli</h2>
            <p className="text-white/60 text-lg mb-8">Tüm otomasyonlarınızı tek bir ekrandan izleyin, kazancınızı takip edin ve yeni modüller ekleyin.</p>
            <Button className="px-12 py-4 text-lg">Panele Git</Button>
          </div>
          <div className="flex-1 w-full h-64 bg-black/40 rounded-2xl border border-white/10 flex items-center justify-center text-white/20 italic">
            Dashboard Görseli / Grafik Alanı
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/5 text-center text-white/30 text-sm">
        © 2026 CleverAIHub. Tüm hakları saklıdır.
      </footer>
    </div>
  );
}
