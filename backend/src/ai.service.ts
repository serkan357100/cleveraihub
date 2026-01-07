import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  async recommend(profession: string, context?: any) {
    const p = (profession || 'Genel').toLowerCase();
    return {
      title: 'Sektörel Analiz Sonucu',
      profession: profession || 'Genel',
      summary: `${profession} sektörü için otomasyon stratejiniz hazırlandı.`,
      automations: [
        'WhatsApp Otomatik Karşılama',
        'Müşteri Kayıt ve CRM Entegrasyonu',
        'Akıllı Takip Mesajları',
        'Randevu Hatırlatıcı'
      ],
      missingInfoNeeded: ['WhatsApp Numarası', 'Bölge Bilgisi'],
      recommendedPackages: [{ packageId: '1', reason: 'En popüler başlangıç paketi.' }]
    };
  }

  async setupPlan(packageId: string, businessInfo?: any) {
    return {
      status: 'ready',
      steps: ['Bağlantı Kur', 'Verileri Senkronize Et', 'Test Et']
    };
  }
}
