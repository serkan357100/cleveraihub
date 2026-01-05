import { useState } from 'react';
import { useRouter } from 'next/router';
import { paymentsApi } from '@/lib/api';

export default function Checkout() {
  const router = useRouter();
  const { packageId } = router.query;
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      await paymentsApi.checkout({ packageId: packageId as string, paymentMethodId: 'pm_demo' });
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Ödeme</h1>
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full py-4 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 rounded-lg font-bold"
        >
          {loading ? 'Ýþleniyor...' : 'Ödemeyi Tamamla'}
        </button>
      </div>
    </div>
  );
}
