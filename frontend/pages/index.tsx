import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function Home() {
  const [profession, setProfession] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!profession) return alert('Lütfen mesleğinizi yazın.');
    setLoading(true);
    try {
      // Backend AI endpoint'ine istek atıyoruz
      const res = await axios.post('https://cleveraihub-8.onrender.com/api/ai/recommend', {
        profession: profession
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert('Analiz sırasında bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white font-sans">
      {/* Header */}
      <nav className="p-6 flex justify-between items-center border-b border-gray-800">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          CleverAIHub
        </h1>
        <Link href="/dashboard" className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-full font-bold transition-all">
          Panelime Git
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto pt-20 px-6 pb-20">
        {!result ? (
          <div className="text-center">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              İşinizi <span className="text-cyan-400">Yapay Zeka</span> İle Otomatikleştirin
            </h2>
            <p className="text-xl text-gray-400 mb-12">
              Mesleğinizi yazın, CleverAI Engine sizin için en uygun otomasyon stratejisini saniyeler içinde hazırlasın.
            </p>

            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                placeholder="Örn: Emlakçıyım, E-ticaret yapıyorum..."
                className="w-full bg-[#111827] border-2 border-gray-800 rounded-2xl p-6 text-xl outline-none focus:border-cyan-500 transition-all pr-40"
              />
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="absolute right-3 top-3 bottom-3 px-8 bg-cyan-500 hover:bg-cyan-400 rounded-xl font-bold text-lg transition-all disabled:bg-gray-700"
              >
                {loading ? 'Analiz Ediliyor...' : 'Analiz Et'}
              </button>
            </div>
          </div>
        ) : (
          /* AI ANALİZ SONUÇ EKRANI */
          <div className="bg-[#111827] rounded-3xl p-8 md:p-12 border border-gray-800 shadow-2xl animate-fade-in">
            <button onClick={() => setResult(null)} className="text-gray-500 hover:text-white mb-6">← Yeni Analiz</button>
            <h2 className="text-3xl font-bold text-cyan-400 mb-4">{result.title}</h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">{result.summary}</p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-[#0a0f1a] p-6 rounded-2xl border border-gray-800">
                <h3 className="font-bold text-white mb-4 uppercase tracking-widest text-sm">Önerilen Otomasyonlar</h3>
                <ul className="space-y-3">
                  {result.automations.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-gray-400">
                      <span className="text-cyan-500">✔</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#0a0f1a] p-6 rounded-2xl border border-gray-800">
                <h3 className="font-bold text-white mb-4 uppercase tracking-widest text-sm">Gerekli Bilgiler</h3>
                <ul className="space-y-3">
                  {result.missingInfoNeeded.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-gray-400">
                      <span className="text-yellow-500">●</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 text-center">
              <h3 className="text-xl font-bold mb-6">Sizin İçin En Uygun Paket</h3>
              <div className="inline-block bg-gradient-to-br from-cyan-900/20 to-blue-900/20 p-1 rounded-2xl border border-cyan-500/30">
                <div className="bg-[#111827] p-6 rounded-xl">
                  <p className="text-cyan-400 font-bold mb-2">Önerilen</p>
                  <h4 className="text-2xl font-bold mb-4">Emlakçı Otomasyon Paketi</h4>
                  <Link href="/packages/1" className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 rounded-lg font-bold transition-all inline-block">
                    Hemen İncele ve Başlat
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-[#0a0f1a]/90 flex flex-col items-center justify-center z-50">
          <div className="w-20 h-20 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-6"></div>
          <h2 className="text-2xl font-bold text-white animate-pulse">Sektörel Analiz Yapılıyor...</h2>
          <p className="text-gray-500 mt-2">CleverAI Engine verileri optimize ediyor.</p>
        </div>
      )}
    </div>
  );
}
