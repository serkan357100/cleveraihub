import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  // Bu fonksiyon Abacus gibi davranacak
  async getRecommendation(profession: string) {
    // Şimdilik simüle ediyoruz, API key gelince buraya gerçek istek gelecek
    return {
      suggestedPackageId: "1", // Emlakçı paketi
      aiReasoning: `${profession} sektörü için en kritik ihtiyaç hızlı müşteri dönüşüdür. Bu paketle WhatsApp üzerinden gelen talepleri kaçırmazsınız.`,
      estimatedSetupTime: "3 dakika",
      missingInfoNeeded: ["WhatsApp İşletme Numarası", "Bölge Bilgisi"]
    };
  }

  // Bu fonksiyon Z.AI gibi davranacak
  async getSetupPlan(packageId: string) {
    return {
      steps: [
        "WhatsApp API Yetkilendirmesi",
        "CRM Veritabanı Senkronizasyonu",
        "AI Yanıt Taslaklarının Onayı"
      ],
      technicalStatus: "Hazır"
    };
  }
}
