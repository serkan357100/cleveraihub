// File: pages/index.tsx

import React, { useState, useEffect, useRef } from "react";

function Button({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-3 rounded-xl transition ${className ?? ""}`}
    >
      {children}
    </button>
  );
}

export default function HomePage() {
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
    // Prevent auto-scroll on initial load; only scroll on subsequent message updates
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
    <div className="relative min-h-screen bg-black text-white font-sans">
      {/* NAVBAR / LOGO */}
      <nav className="w-full h-20 flex items-center justify-between px-8 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-400 rounded-md flex items-center justify-center text-black font-bold">
            C
          </div>
          <div className="text-lg font-semibold tracking-tight">CleverAIHub</div>
        </div>

        <div className="flex items-center gap-6">
          <a href="#market" className="text-white/80 hover:text-white">
            Market
          </a>
          <a href="#packages" className="text-white/80 hover:text-white">
            Packages
          </a>
          <a href="#dashboard" className="text-white/80 hover:text-white">
            Dashboard
          </a>
          <Button>Giriş / Kayıt</Button>
        </div>
      </nav>

      {/* HERO TITLE */}
      <header className="h-[22vh] w-full max-w-7xl px-6 mx-auto flex flex-col justify-center items-center text-center z-10">
        <h1
          className="text-4xl md:text-5xl font-extrabold tracking-tight whitespace-nowrap"
          style={{ transform: "translateY(-8px)" }}
        >
          Mesleğinize Özel <span className="text-cyan-400">Yapay Zeka Otomasyonları</span>
        </h1>
      </header>

      {/* CHAT AREA */}
      <main
        className="absolute top-[15vh] left-1/2 transform -translate-x-1/2 w-[90vw] max-w-7xl bg-[#121827] rounded-3xl shadow-2xl flex flex-col"
        style={{ height: "70vh" }}
      >
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

        <div className="p-6 border-t border-white/10 flex gap-4">
          <input
            type="text"
            className="flex-grow rounded-xl bg-black/40 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition text-lg"
            placeholder="Mesleğinizi yazın..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend}>Gönder</Button>
        </div>
      </main>

      {/* MARKET SECTION */}
      <section id="market" className="pt-[95vh] pb-24 w-full">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-4">Market</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white/5 rounded-xl">Market item 1</div>
            <div className="p-6 bg-white/5 rounded-xl">Market item 2</div>
            <div className="p-6 bg-white/5 rounded-xl">Market item 3</div>
          </div>
        </div>
      </section>

      {/* PACKAGES SECTION */}
      <section id="packages" className="pb-24 w-full">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-4">Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white/5 rounded-xl">Package A</div>
            <div className="p-6 bg-white/5 rounded-xl">Package B</div>
            <div className="p-6 bg-white/5 rounded-xl">Package C</div>
          </div>
        </div>
      </section>

      {/* DASHBOARD SECTION */}
      <section id="dashboard" className="pb-24 w-full">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <div className="p-6 bg-white/5 rounded-xl">Dashboard overview placeholder</div>
        </div>
      </section>
    </div>
  );
}
