import React, { useState, useEffect, useRef } from "react";

// Basit ve sağlam Buton bileşeni
const Button = ({ children, onClick, className }: { children: React.ReactNode; onClick?: () => void; className?: string }) => (
  <button
    onClick={onClick}
    className={`bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-2 rounded-lg transition-all active:scale-95 ${className ?? ""}`}
  >
    {children}
  </button>
);

export default function CleverAIHub() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content: "Merhaba, ben CleverAI; mesleğinize özel otomasyon paketlerini kodlama veya teknik kurulum gerekmeden hazırlarım.",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  // Sadece yeni mesaj geldiğinde aşağı kaydır, sayfa ilk açıldığında değil
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
      
      {/* NAVBAR */}
      <nav className="w-full h-20 border-b border-white/10 flex items-center justify-between px-8 bg-black">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center text-black font-black text-xl">C</div>
          <span className="text-2xl font-bold tracking-tighter">CleverAI<span className="text-cyan-400">Hub</span></span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-white/70 hover:text-white transition">Market</a>
          <a href="#" className="text-white/70 hover:text-white transition">Paketler</a>
          <Button>Giriş Yap</Button>
        </div>
      </nav>

      {/* HERO & CHAT AREA */}
      <div className="flex flex-col items-center pt-16 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4" style={{ transform: 'translateY(-8px)' }}>
            Mesleğinize Özel <span className="text-cyan-400">Yapay Zeka Otomasyonları</span>
          </h1>
        </div>

        {/* CHAT BOX */}
        <div className="w-full max-w-5xl bg-[#0D121F] border border-white/10 rounded-3xl shadow-2xl flex flex-col h-[60vh] overflow-hidden">
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
            <Button onClick={handleSend}>Gönder</Button>
          </div>
        </div>
      </div>

    </div>
  );
}
