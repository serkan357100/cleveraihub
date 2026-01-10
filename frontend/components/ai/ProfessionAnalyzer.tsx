import { useState, useEffect, useRef } from "react";
import Button from "../ui/Button";

export default function FinalCleverAIHomepage() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content: "Merhaba, ben CleverAI. Mesleğinizi yazın, sizin için en uygun otomasyon paketlerini saniyeler içinde hazırlayayım."
    }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    // AI Yanıt Simülasyonu
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "ai", content: "Analiz ediyorum... Sizin için en uygun paketleri hazırlıyorum." }]);
    }, 1000);
  };

  return (
    <div className="h-screen w-screen bg-[#05070A] text-white flex flex-col overflow-hidden font-sans">
      
      {/* 1️⃣ NAVBAR: En üstte, bağımsız */}
      <nav className="w-full h-20 flex items-center px-10 flex-shrink-0 border-b border-white/5">
        <div className="text-2xl font-black tracking-tighter text-cyan-400">CleverAI<span className="text-white">Hub</span></div>
      </nav>

      {/* ANA İÇERİK ALANI */}
      <div className="flex-1 flex flex-col items-center relative">
        
        {/* 2️⃣ & 3️⃣ & 4️⃣ BAŞLIK VE AÇIKLAMA (Ortadan Yukarıda, Tek Satır) */}
        <div className="mt-[8vh] mb-[6vh] text-center z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight whitespace-nowrap">
            Mesleğinize Özel <span className="text-cyan-400">Yapay Zeka Otomasyonları</span>
          </h1>
          <p className="mt-4 text-white/60 text-lg md:text-xl whitespace-nowrap">
            Kod yazmaya veya teknik kuruluma gerek yok. CleverAI ile dakikalar içinde otomasyonunuz hazır.
          </p>
        </div>

        {/* 5️⃣ AI CHAT ALANI: Alt kısmı dolduran geniş alan */}
        <main className="w-[92vw] max-w-[1600px] flex-1 bg-[#0D121F] border-t border-x border-white/10 rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden">
          
          {/* Mesaj Akışı */}
          <div className="flex-1 overflow-y-auto p-10 space-y-6 custom-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] p-5 rounded-2xl text-lg ${
                  msg.role === "user" 
                  ? "bg-cyan-600 text-white rounded-tr-none" 
                  : "bg-white/5 border border-white/10 text-white/90 rounded-tl-none"
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Giriş Alanı */}
          <div className="p-8 bg-black/20 border-t border-white/5">
            <div className="max-w-5xl mx-auto flex gap-4 items-center bg-[#05070A] border border-white/10 p-2 rounded-2xl shadow-2xl">
              <input
                className="flex-1 bg-transparent border-none px-6 py-4 text-white text-xl focus:outline-none placeholder:text-white/20"
                placeholder="Mesleğinizi buraya yazın..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <Button 
                onClick={handleSend}
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-black px-10 py-4 rounded-xl transition-all"
              >
                GÖNDER
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
