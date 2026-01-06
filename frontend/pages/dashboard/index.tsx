import { useEffect, useState } from 'react';
import { dashboardApi } from '@/lib/api';
import Link from 'next/link';

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    dashboardApi.get()
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Dashboard verisi çekilemedi:", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="min-h-screen bg-gray-900 text-white p-8">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold text-cyan-400">CleverAIHub Panel</h1>
          <Link href="/" className="text-gray-400 hover:text-white">Çıkış Yap</Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <p className="text-gray-400 text-sm uppercase">Aktif Paketler</p>
            <p className="text-3xl font-bold">{data?.activeSubscriptions || 0}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <p className="text-gray-400 text-sm uppercase">Toplam Kazanç</p>
            <p className="text-3xl font-bold text-green-400">${data?.totalEarnings || 0}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <p className="text-gray-400 text-sm uppercase">Bildirimler</p>
            <p className="text-3xl font-bold text-yellow-400">{data?.notificationsCount || 0}</p>
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Hızlı İşlemler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="p-4 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-bold transition-colors">
              Yeni Otomasyon Paketi Oluştur
            </button>
            <button className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold transition-colors">
              Marketplace'e Göz At
            </button>
          </div>
        </section>

        {error && (
          <div className="mt-8 p-4 bg-red-900/30 border border-red-500 rounded text-red-200">
            Backend bağlantısında bir sorun oluştu. Lütfen CORS ayarlarını kontrol edin.
          </div>
        )}
      </div>
    </div>
  );
}

