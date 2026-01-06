import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        CleverAIHub
      </h1>
      <p className="text-xl text-gray-400 mb-12 max-w-2xl">
        Yapay zeka destekli otomasyon modülleriyle işinizi saniyeler içinde otomatikleştirin.
      </p>
      
      <div className="flex gap-4">
        <Link href="/packages" className="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 rounded-full font-bold text-lg transition-all">
          Paketleri Keşfet
        </Link>
        <Link href="/dashboard" className="px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-full font-bold text-lg transition-all border border-gray-700">
          Panelime Git
        </Link>
      </div>
    </main>
  );
}
