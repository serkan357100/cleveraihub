import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [profession, setProfession] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!profession) return alert('Lütfen mesleğinizi yazın.');
    setLoading(true);
    try {
      const res = await fetch('https://cleveraihub-8.onrender.com/api/ai/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profession }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert('Hata: ' + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white p-10">
      {!result ? (
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">CleverAIHub</h1>
          <input 
            className="w-full p-4 bg-gray-900 border border-gray-700 rounded-xl mb-4"
            placeholder="Mesleğiniz..."
            onChange={(e) => setProfession(e.target.value)}
          />
          <button 
            onClick={handleAnalyze}
            className="bg-cyan-500 px-8 py-3 rounded-xl font-bold w-full"
          >
            {loading ? 'Analiz Ediliyor...' : 'Analiz Et'}
          </button>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-3xl border border-gray-800">
          <button onClick={() => setResult(null)} className="mb-4 text-gray-500">← Geri</button>
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">{result.title}</h2>
          <p className="mb-6">{result.summary}</p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black p-4 rounded-xl">
              <h3 className="font-bold mb-2">Otomasyonlar</h3>
              {result.automations?.map((a: any, i: number) => <div key={i}>- {a}</div>)}
            </div>
            <div className="bg-black p-4 rounded-xl">
              <h3 className="font-bold mb-2">Gerekenler</h3>
              {result.missingInfoNeeded?.map((m: any, i: number) => <div key={i}>• {m}</div>)}
            </div>
          </div>
          
          <div className="mt-8 text-center border-t border-gray-800 pt-6">
            <Link href="/packages/1" className="bg-cyan-500 px-10 py-4 rounded-full font-bold inline-block">
              Paketi Başlat
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
