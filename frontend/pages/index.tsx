import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ padding: 24, fontFamily: 'sans-serif' }}>
      <h1>CleverAIHub</h1>
      <p>Merhaba, bu CleverAIHub frontend başlangıç sayfasıdır.</p>
      <p>
        Dashboard için{' '}
        <Link href="/dashboard">
          <u>buraya tıklayın</u>
        </Link>
        .
      </p>
    </main>
  );
}
