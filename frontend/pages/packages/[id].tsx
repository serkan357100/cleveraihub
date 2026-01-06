import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { packagesApi } from '@/lib/api';
import Link from 'next/link';

export default function PackageDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [pkg, setPkg] = useState<any>(null);

  useEffect(() => {
    if (id) {
      packagesApi.getById(id as string)
        .then(res => setPkg(res.data))
        .catch(err => console.error(err));
    }
  }, [id]);

  if (!pkg) return <div className="min-h-screen bg-gray-900 text-white p-8">Yükleniyor...</div>;

  const monthlyPrice = pkg.pricing?.monthly_usd || 29;

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <Link href="/packages" className="text-gray-400 hover:text-cyan-400 mb-8 inline-block transition-colors">
          ← Markete Geri Dön
        </Link>

        <div className="bg-[#111827] rounded-3xl p-10 border border-gray-800 shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start gap-10">
            <div className="flex-1">
              <h1 className="text-5xl font-extrabold mb-6 text-white leading-tight">{pkg.name}</h1>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">{pkg.description}</p>
              
              <h3 className="text-lg font-semibold text-cyan-400 mb-4 uppercase tracking-widest">Dahil Olan Modüller</h3>
              <div className="flex flex-wrap gap-3 mb-8">
                {pkg.modules?.map((m: any, i: number) => (
                  <span key={i} className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-full border border-blue-800 text-sm font-medium">
                    {typeof m === 'string' ? m : m.title}
                  </span>
                ))}
              </div>
            </div>

            <div className="w-full md:w-80 bg-[#1f2937] p-8 rounded-2xl border border-gray-700 shadow-inner">
              <div className="text-center mb-8">
                <p className="text-gray-400 mb-2">Aylık Abonelik</p>
                <p className="text-5xl font-bold text-white">${monthlyPrice}</p>
              </div>
              
              <Link 
                href={`/checkout?packageId=${pkg.id}`}
                className="w-full py-4 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center mb-4"
              >
                Hemen Başlat
              </Link>
              <p className="text-xs text-gray-500 text-center italic">İstediğiniz zaman iptal edebilirsiniz.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}







