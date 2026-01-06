import { useEffect, useState } from 'react';
import { dashboardApi } from '@/lib/api';
import Link from 'next/link';

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardApi.get()
      .then(res => { setData(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="min-h-screen bg-gray-900 text-cyan-400 p-8">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12 border-b border-gray-800 pb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            CleverAIHub Panel
          </h1>
          <Link href="/" className="px-4 py-2 bg-red-900/30 text-red-400 rounded-lg hover:bg-red-900/50 transition-all">
            Çıkış Yap
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800 shadow-xl">
            <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Aktif Paketler</p>
            <p className="text-4xl font-bold text-cyan-400">{data?.activeSubscriptions || 0}</p>
          </div>
          <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800 shadow-xl">
            <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Toplam Kazanç</p>
            <p className="text-4xl font-bold text-green-400">${data?.totalEarnings || 0}</p>
          </div>
          <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800 shadow-xl">
            <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Bildirimler</p>
            <p className="text-4xl font-bold text-yellow-400">{data?.notificationsCount || 0}</p>
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-semibold mb-6 text-gray-200">Hızlı İşlemler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button className="p-6 bg-gradient-to-br from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 rounded-2xl font-bold text-xl shadow-lg transition-all transform hover:scale-[1.02]">
              + Yeni Otomasyon Paketi Oluştur
            </button>
            <Link href="/packages" className="p-6 bg-[#1f2937] hover:bg-[#374151] rounded-2xl font-bold text-xl shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center border border-gray-700">
              🛒 Marketplace'e Göz At
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}


