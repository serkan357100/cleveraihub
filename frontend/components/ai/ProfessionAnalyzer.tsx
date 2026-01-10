import { useState, useEffect, useRef } from "react";
import Button from "../ui/Button";

export default function CleverAIChatInterface() {
  const [messages, setMessages] = useState([
    { role: "ai", content: "Merhaba, ben CleverAI. Mesleğinizi yazın, sizin için en uygun otomasyon paketlerini saniyeler içinde hazırlayayım." }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // Sohbeti otomatik aşağı kaydır
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Kullanıcı mesajını ekle
    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // AI Yanıtı Simülasyonu (Burada API'ye bağlanacak)
    setTimeout(() => {
      setMessages((prev) => [...prev, { 
        role: "ai", 
        content: `Anladım, bir ${input} için şu otomasyonları öneririm: WhatsApp Takip, CRM Entegrasyonu ve Randevu Sistemi. Aktif etmemi ister misiniz?` 
      }]);
    }, 1000);
  };

  return (
    /* ANA DIŞ KUTU: EKRANI DÖRT YANDAN DOLDURUR, KENARDA ÇOK AZ BOŞLUK (p-2) */
    <div className="fixed inset-0 bg-[#05070A] p-2 flex flex-col overflow-hidden">
      
      {/* SOHBET ALANI: TÜM EKRANI KAPLAYAN ANA ÇERÇEVE */}
      <div className="flex-1 w-full bg-[#0D121F] border border-white/10 rounded-2xl flex flex-col relative overflow-hidden">
        
        {/* Üst Bilgi Çubuğu */}
        <div className="w-full p-4 border-b border-white/5 bg-black/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></div>
            <span className="text-white font-bold tracking-wide">CleverAI Hub Asistanı</span>
          </div>
          <button className="text-white/50 hover:text-white text-sm">Geçmişi Temizle</button>
        </div>

        {/* MESAJLARIN AKTIĞI ALAN */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl text-lg ${
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

        {/* GİRİŞ ALANI: EN ALTTA SABİT */}
        <div className="p-6 bg-black/20 border-t border-white/5">
          <div className="max-w-5xl mx-auto flex gap-4 items-center bg-[#121827] border border-white/10 p-2 rounded-2xl shadow-2xl">
            <input
              className="flex-1 bg-transparent border-none px-4 py-3 text-white text-lg focus:outline-none placeholder:text-white/30"
              placeholder="Mesleğinizi buraya yazın..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <Button 
              onClick={handleSend}
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-3 rounded-xl transition-all"
            >
              Gönder
            </Button>
          </div>
          <p className="text-center text-white/20 text-xs mt-4">
            CleverAI hata yapabilir. Önemli bilgileri kontrol edin.
          </p>
        </div>

      </div>
    </div>
  );
}
