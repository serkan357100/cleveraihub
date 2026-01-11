import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Button from "../components/ui/Button";

export default function HomePage() {
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
      setMessages((prev) => [...prev, { role: "ai", content: "Analiz tamamlandı. Sizin için en uygun paketleri hazırlıyorum..." }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />

      {/* HERO SECTION */}
      <div className="flex flex-col items-center pt-12 px-4">
        {/* Başlık Düzenlemesi: 2.5rem ve -0.5rem yukarı taşıma */}
        <h1 
          className="font-black tracking-tight text-center mb-6"
          style={{ fontSize: '2.5rem', marginTop: '-0.5rem' }}
        >
          Mesleğinize Özel <span className="text-cyan-400">Yapay Zeka Otomasyonları</span>
        </h1>

        {/* Chat Paneli Düzenlemesi: %95 genişlik, 800px max-width ve yukarı kaydırma */}
        <div 
          className="bg-[#0D121F] border border-white/10 rounded-3xl shadow-2xl flex flex-col h-[55vh] overflow-hidden"
          style={{ width: '95%', maxWidth: '800px', marginTop: '-0.25rem' }}
        >
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
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
            <button 
              onClick={handleSend}
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-2 rounded-lg transition-all"
            >
              Gönder
            </button>
          </div>
        </div>
      </div>

      {/* MARKET & PACKAGES (Eski Tasarım Öğeleri) */}
      <section className="py-20 px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">Popüler Paketler</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["Emlakçı Paketi", "E-Ticaret Paketi", "Sağlık Paketi"].map((pkg) => (
            <div key={pkg} className="bg-[#0D121F] border border-white/10 p-6 rounded-2xl hover:border-cyan-500/50 transition">
              <h3 className="text-xl font-bold mb-2 text-cyan-400">{pkg}</h3>
              <p className="text-white/50 text-sm mb-4">Bu meslek grubu için optimize edilmiş tam otomatik çözüm.</p>
              <div className="text-2xl font-bold mb-4">$49<span className="text-sm text-white/30">/ay</span></div>
              <button className="w-full py-2 bg-white/5 rounded-lg hover:bg-cyan-500 hover:text-black transition">İncele</button>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
