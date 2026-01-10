import { useState, useEffect, useRef } from "react";
import Button from "../ui/Button";

export default function HomepageChat() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content:
        "Merhaba, ben CleverAI. Mesleğinizi yazın, sizin için en uygun otomasyon paketlerini saniyeler içinde hazırlayayım.",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // Scroll chat to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate AI response (replace with real API call)
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
    <div className="h-screen flex flex-col bg-[#0D121F] text-white">
      {/* TOP AREA: 28% height */}
      <header className="flex-shrink-0 h-[28vh] p-6 flex flex-col justify-center max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold">
          Mesleğinize Özel{" "}
          <span className="text-cyan-400">Yapay Zeka Otomasyonları</span>
        </h1>
        <p className="mt-3 text-white/80 text-lg max-w-3xl">
          Kod yazmaya ya da teknik kuruluma gerek yok. CleverAI ile dakikalar
          içinde otomasyonunuz hazır.
        </p>
      </header>

      {/* BOTTOM AREA: 72% height, chat interface */}
      <main className="flex-grow p-4 max-w-5xl mx-auto flex flex-col bg-[#121827] rounded-2xl shadow-lg">
        {/* Messages area */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[80%] p-4 rounded-2xl text-lg ${
                msg.role === "user"
                  ? "bg-cyan-600 text-white self-end rounded-tr-none"
                  : "bg-white/10 text-white rounded-tl-none"
              }`}
            >
              {msg.content}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="mt-4 flex gap-4">
          <input
            type="text"
            className="flex-grow rounded-xl bg-black/40 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition text-lg"
            placeholder="Mesleğinizi yazın..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button
            onClick={handleSend}
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-3 rounded-xl"
          >
            Gönder
          </Button>
        </div>
      </main>
    </div>
  );
}
