import PackageCard from '../../components/PackageCard';
import { packagesApi } from '@/lib/api';
import PackageCard from '@/components/PackageCard';

export default function Marketplace() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    packagesApi.list()
      .then(res => {
        setPackages(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Paketler yüklenemedi:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="min-h-screen bg-gray-900 text-white p-8 text-center">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-cyan-400">Otomasyon Marketi</h1>
        <p className="text-gray-400 mb-12 text-lg">İşinizi kolaylaştıracak hazır paketleri keşfedin.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg: any) => (
            <PackageCard key={pkg.id} package={pkg} />
          ))}
        </div>
      </div>
    </div>
  );
}
