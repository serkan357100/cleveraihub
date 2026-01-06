import { Injectable } from '@nestjs/common';

@Injectable()
export class PackagesService {
  private packages = [
    {
      id: '1',
      name: 'Emlakçı Otomasyon Paketi',
      seller: 'CleverAI Official',
      seller_rating: 4.9,
      sales_count: 142,
      summary: 'WhatsApp, CRM ve Otomatik Takip sistemi bir arada.',
      description: 'Emlakçılar için özel olarak tasarlanmış, ilan takibi ve müşteri yönetimi sağlayan tam kapsamlı paket. Gelen talepleri anında yanıtlar ve portföyünüze uygun müşterileri eşleştirir.',
      pricing: { monthly_usd: 29 },
      modules: [
        { title: 'WhatsApp Agent', desc: '7/24 Otomatik Yanıt' },
        { title: 'Smart CRM', desc: 'Müşteri Kayıt Sistemi' },
        { title: 'Lead Follow-up', desc: 'Otomatik Takip' }
      ],
      features: ['Sınırsız Mesajlaşma', 'Emlak Portalları Entegrasyonu', 'Haftalık Raporlama']
    },
    {
      id: '2',
      name: 'E-Ticaret Destek Paketi',
      seller: 'Z-Automation Lab',
      seller_rating: 4.7,
      sales_count: 89,
      summary: 'Müşteri sorularına AI destekli anında cevap sistemi.',
      description: 'Shopify veya Woocommerce mağazanız için 7/24 çalışan AI asistan ve mail otomasyonu. Kargo sorgulama ve iade süreçlerini tamamen otomatikleştirir.',
      pricing: { monthly_usd: 59 },
      modules: [
        { title: 'AI Chatbot', desc: 'Zeki Müşteri Temsilcisi' },
        { title: 'Mail Agent', desc: 'Otomatik E-Posta' },
        { title: 'Order Tracker', desc: 'Sipariş Takip' }
      ],
      features: ['Çoklu Dil Desteği', 'Shopify Entegrasyonu', 'Duygu Analizi']
    }
  ];

  findAll() {
    return this.packages;
  }

  findOne(id: string) {
    return this.packages.find(p => p.id === id);
  }
}
