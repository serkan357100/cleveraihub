import { useRouter } from 'next/router';

export default function PackageCard({ package: pkg }: any) {
  const router = useRouter();

  // Eğer paket verisi yoksa hiçbir şey render etme
  if (!pkg) return null;

  // Fiyatı güvenli şekilde al
  const price = pkg.pricing?.monthly_usd || pkg.priceUsd || 0;

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-cyan-400 transition-all">
      <h3 className="text-xl font-bold mb-2">{pkg.name || 'İsimsiz Paket'}</h3>
      <p className="text-gray-400 text-sm mb-4">{pkg.summary || 'Açıklama yok'}</p>
      <p className="text-2xl font-bold text-cyan-400 mb-4">
        ${price}/ay
      </p>

      <button
        onClick={() => router.push(`/packages/${pkg.id}`)}
        className="w-full bg-cyan-500 hover:bg-cyan-600 py-2 rounded font-semibold transition-all"
      >
        Hızlı Başlat
      </button>
    </div>
  );
}
