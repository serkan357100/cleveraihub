// frontend/pages/packages/[id].tsx
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import PackageCard from '../../components/PackageCard';

interface PackageModule {
  id: string;
  title: string;
  description: string;
  active: boolean;
}

interface Package {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  priceOneTime: number;
  modules: PackageModule[];
}

interface PackagePageProps {
  packageData: Package;
}

export default function PackagePage({ packageData }: PackagePageProps) {
  const [modules, setModules] = useState(packageData.modules);
  const [successMessage, setSuccessMessage] = useState('');

  const handleToggleModule = (moduleId: string) => {
    setModules(prev =>
      prev.map(m => (m.id === moduleId ? { ...m, active: !m.active } : m))
    );
  };

  const handleQuickStart = () => {
    // Bu kýsýmda backend /api/packages/activate veya benzeri endpoint çaðrýlýr
    setSuccessMessage('Paket baþarýyla baþlatýldý!');
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-cyan-400 mb-4">{packageData.name}</h1>
        <p className="text-gray-300 mb-6">{packageData.description}</p>
        <div className="flex space-x-4 mb-6">
          <span className="px-4 py-2 bg-blue-800 rounded">Aylýk: ${packageData.priceMonthly}</span>
          <span className="px-4 py-2 bg-blue-800 rounded">Tek Seferlik: ${packageData.priceOneTime}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {modules.map(module => (
            <PackageCard
              key={module.id}
              title={module.title}
              description={module.description}
              active={module.active}
              onToggle={() => handleToggleModule(module.id)}
            />
          ))}
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleQuickStart}
            className="px-6 py-3 bg-cyan-400 text-gray-900 font-bold rounded hover:bg-cyan-500 transition"
          >
            Hýzlý Baþlat
          </button>
          <button
            className="px-6 py-3 border border-cyan-400 text-cyan-400 font-bold rounded hover:bg-cyan-700 transition"
          >
            Detay / Özelleþtir
          </button>
        </div>

        {successMessage && (
          <div className="mt-4 p-4 bg-green-600 text-white rounded">{successMessage}</div>
        )}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.params as { id: string };
  const res = await fetch(`${process.env.BACKEND_URL}/api/packages/${id}`);
  const packageData = await res.json();

  return {
    props: { packageData },
  };
};





