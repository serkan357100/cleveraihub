import { useEffect, useState } from 'react';
import { packagesApi } from '../../lib/api';
import PackageCard from '../../components/PackageCard';

export default function Marketplace() {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    packagesApi.list()
      .then(res => {
        console.log("Backend'den gelen veri:", res.data);
        setPackages(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("API Hatası:", err);
        setError("Backend bağlantısı kurulamadı.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="min-h-screen bg-gray-900 text-white p-8 text-center text-2xl">Paketler Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-cyan-400">Otomasyon Marketi</h1>
        
        {error && (
          <div className="bg-red-600/20 border border-red-600 p-4 rounded mb-8 text-red-200">
            {error} - Lütfen backend'in çalıştığından emin olun.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages && packages.length > 0 ? (
            packages.map((pkg: any) => (
              <PackageCard key={pkg.id} package={pkg} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 border-2 border-dashed border-gray-800 rounded-xl">
              <p className="text-xl text-gray-500">Şu an sergilenecek paket bulunamadı.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
