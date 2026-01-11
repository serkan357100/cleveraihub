// File: pages/index.tsx

import React, { useState, useEffect, useRef } from "react";
import Button from "../ui/Button";

export default function LayeredChatHomepage() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content:
        "Merhaba, ben CleverAI; mesleğinize özel otomasyon paketlerini kodlama veya teknik kurulum gerekmeden hazırlarım.",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      didMountRef.current = true;
    }
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
          content: `Anladım, bir ${input} için en uygun otomasyonları hazırlıyorum...`,
        },
      ]);
    }, 1000);
  };

  return (
    <div className="relative h-screen bg-black text-white flex flex-col items-center overflow-hidden">
      {/* Header area: Title only with forced vertical offset */}
      <header className="h-[22vh] w-full max-w-7xl px-6 flex flex-col justify-center items-center text-center z-10">
        <h1
          className="text-4xl md:text-5xl font-extrabold tracking-tight whitespace-nowrap"
          style={{ transform: "translateY(-8px)" }}
        >
          Mesleğinize Özel <span className="text-cyan-400">Yapay Zeka Otomasyonları</span>
        </h1>
      </header>

      {/* Chat area: Dominant container with initial message */}
      <main
        className="absolute top-[15vh] w-[90vw] max-w-7xl bg-[#121827] rounded-3xl shadow-2xl flex flex-col"
        style={{ height: "70vh" }}
      >
        {/* Messages area */}
        <div className="flex-grow overflow-y-auto p-6 space-y-4 custom-scrollbar">
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
        <div className="p-6 border-t border-white/10 flex gap-4">
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
