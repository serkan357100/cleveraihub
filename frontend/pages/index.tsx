{/* CHAT PANEL */}
        <div className="w-[90vw] max-w-5xl bg-[#0D121F] border border-white/10 rounded-3xl shadow-2xl flex flex-col h-[55vh] overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={flex ${msg.role === "user" ? "justify-end" : "justify-start"}}>
                <div className={max-w-[80%] p-4 rounded-2xl text-lg ${msg.role === "user" ? "bg-cyan-600 text-white" : "bg-white/5 border border-white/10 text-white/90"}}>
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
              <div key={pkg.name} className={p-10 rounded-[2.5rem] border ${pkg.name === "Profesyonel" ? "border-cyan-500 bg-cyan-500/5 scale-105" : "border-white/10 bg-[#0D121F]"}}>
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
