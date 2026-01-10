import { useState, useEffect, useRef } from "react";
import Button from "../ui/Button";

export default function PremiumCenteredHomepage() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content:
        "Merhaba, ben CleverAI. Mesleğinizi yazın, sizin için en uygun otomasyon paketlerini saniyeler içinde hazırlayayım.",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: `Anladım, bir ${input} için şu otomasyonları öneririm: WhatsApp Takip, CRM Entegrasyonu ve Randevu Sistemi. Aktif etmemi ister misiniz?`,
        },
      ]);
    }, 1000);
  };

  return (
    <div className="relative h-screen bg-[#0D121F] text-white flex flex-col items-center overflow-hidden">
      
      {/* HERO SECTION: Başlık ve Alt Metin (Yatayda Ortalanmış, Dikeyde Hafif Yukarıda) */}
      <header className="h-[30vh] w-full px-6 flex flex-col items-center justify-center text-center -translate-y-[50px] z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
          Mesleğinize Özel <span className="text-cyan-400">Yapay Zeka Otomasyonları</span>
        </h1>
        <p className="mt-5 text-white/70 text-lg md:text-xl max-w-3xl leading-relaxed">
          Kod yazmaya ya da teknik kuruluma gerek yok. CleverAI ile dakikalar içinde otomasyonunuz hazır.
        </p>
      </header>

      {/* AI CHAT AREA: Hero'nun altına yerleşen, geniş ve dominant alan */}
      <main
        className="w-[90vw] max-w-7xl bg-[#121827] rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
        style={{ height: "60vh" }}
      >
        {/* Mesaj Akış Alanı */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] p-5 rounded-2xl text-lg leading-relaxed ${
                  msg.role === "user"
                    ? "bg-cyan-600 text-white rounded-tr-none shadow-lg shadow-cyan-900/20"
                    : "bg-white/5 border border-white/10 text-white/90 rounded-tl-none"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Giriş Alanı (Input) */}
        <div className="p-8 bg-black/20 border-t border-white/5">
          <div className="max-w-4xl mx-auto flex gap-4 items-center bg-[#0D121F] border border-white/10 p-2 rounded-2xl">
            <input
              type="text"
              className="flex-1 bg-transparent border-none px-5 py-3 text-white text-lg focus:outline-none placeholder:text-white/30"
              placeholder="Mesleğinizi buraya yazın..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <Button
              onClick={handleSend}
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-10 py-3 rounded-xl transition-all shadow-lg shadow-cyan-500/20"
            >
              Gönder
            </Button>
          </div>
        </div>
      </main>

    </div>
  );
}
