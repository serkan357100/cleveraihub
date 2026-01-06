import Link from 'next/link';

export default function PackageCard({ package: pkg }: any) {
  const price = pkg.pricing?.monthly_usd || 29;

  return (
    <div className="bg-[#111827] rounded-2xl p-6 border border-gray-800 hover:border-cyan-500/50 transition-all group shadow-lg">
      <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">{pkg.name}</h3>
      <p className="text-gray-400 text-sm mb-6 line-clamp-2">{pkg.summary}</p>
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs text-gray-500 uppercase">Aylık</p>
          <p className="text-2xl font-bold text-white">${price}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 uppercase">Durum</p>
          <p className="text-sm font-medium text-green-400">Aktif</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Link 
          href={`/packages/${pkg.id}`}
          className="py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold text-sm transition-all text-center"
        >
          Hızlı Başlat
        </Link>
        <Link 
          href={`/packages/${pkg.id}`}
          className="py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl font-bold text-sm transition-all text-center border border-gray-700"
        >
          Detaylar
        </Link>
      </div>
    </div>
  );
}
