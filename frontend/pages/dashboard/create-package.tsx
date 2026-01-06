import Link from 'next/link';

export default function CreatePackage() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white p-8 flex flex-col items-center justify-center text-center">
      <div className="max-w-md bg-[#111827] p-10 rounded-3xl border border-gray-800 shadow-2xl">
        <div className="text-6xl mb-6">🛠️</div>
        <h1 className="text-3xl font-bold mb-4 text-cyan-400">Paket Oluşturma</h1>
        <p className="text-gray-400 mb-8 leading-relaxed">
          Kendi otomasyon paketinizi oluşturup Marketplace'te satabileceğiniz bu özellik çok yakında aktif olacak!
        </p>
        <Link 
          href="/dashboard" 
          className="inline-block px-8 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-bold transition-all border border-gray-700"
        >
          ← Panele Geri Dön
        </Link>
      </div>
    </div>
  );
}
