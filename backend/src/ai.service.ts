import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  async recommend(profession: string, context?: any) {
    const safeProfession = (profession || '').trim();
    const p = safeProfession.toLowerCase();

    // Default'lar: HER ZAMAN dolu dönsün diye
    let title = 'Sektörel Analiz Sonucu';
    let summary =
      'Sektörünüz için en yüksek etki: müşteri iletişimi otomasyonu + CRM + takip akışlarıdır.';
    let automations: string[] = [
      'WhatsApp otomatik karşılama ve yönlendirme',
      'CRM kayıt ve müşteri pipeline yönetimi',
      'Otomatik takip mesajları (1.gün / 3.gün / 7.gün)',
      'Randevu planlama ve hatırlatma',
    ];
    let missingInfoNeeded: string[] = [
      'WhatsApp İşletme Numarası',
      'Hizmet bölgesi',
      'Çalışma saatleri',
    ];

    // Mesleğe özel zenginleştirme
    if (p.includes('emlak')) {
      summary =
        'Emlak sektöründe en kritik noktalar: hızlı geri dönüş, lead takibi, randevu yönetimi ve CRM disiplinidir.';
      automations = [
        'WhatsApp otomatik karşılama + müşteri etiketleme (Satılık/Kiralık)',
        'İlan talebi → CRM kaydı → otomatik takip akışı',
        'Randevu linki + otomatik hatırlatma mesajları',
        '“Bütçe / bölge / oda sayısı” sorularını otomatik toplayıp CRM’e yazma',
      ];
      missingInfoNeeded = ['WhatsApp İşletme Numarası', 'Bölge Bilgisi'];
    }

    return {
      title,
      profession: safeProfession,
      summary,
      automations,          // <<< kritik
      missingInfoNeeded,    // <<< kritik
      // ileride bunu dinamik yapacağız:
      recommendedPackages: [{ packageId: '1', reason: 'WhatsApp + CRM + Takip akışı.' }],
    };
  }

  async setupPlan(packageId: string, businessInfo?: any) {
    return {
      packageId,
      status: 'ready',
      estimatedSetupTime: '3-10 dakika',
      steps: [
        { title: 'Numara Bağlama', detail: 'WhatsApp işletme numaranızı doğrulayın.' },
        { title: 'CRM Alanları', detail: 'Ad, telefon, bölge, bütçe gibi alanları seçin.' },
        { title: 'Takip Senaryosu', detail: '1. gün / 3. gün / 7. gün otomatik mesajları.' },
        { title: 'Test (Demo)', detail: 'Kendinize mesaj atarak otomasyonu test edin.' },
      ],
    };
  }
}
