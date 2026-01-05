import { Injectable } from '@nestjs/common';

@Injectable()
export class PackagesService {
  private packages = [
    {
      id: '1',
      name: 'Emlakci Starter Paketi',
      target_profession: 'Emlakci',
      summary: 'WhatsApp + CRM + Randevu sistemi',
      description: 'Emlak profesyonelleri icin hazirlanmis temel otomasyon paketi',
      modules: [
        { key: 'whatsapp', title: 'WhatsApp Agent', description: 'Otomatik mesajlasma' },
        { key: 'crm', title: 'CRM', description: 'Musteri yonetimi' },
        { key: 'appointment', title: 'Randevu', description: 'Otomatik randevu alma' },
      ],
      pricing: { monthly_usd: 29, one_time_usd: null },
      priceUsd: 29,
    },
    {
      id: '2',
      name: 'Avukat Pro Paketi',
      target_profession: 'Avukat',
      summary: 'CRM + Mail + Randevu',
      description: 'Hukuk burolari icin profesyonel otomasyon',
      modules: [
        { key: 'crm', title: 'CRM', description: 'Musteri yonetimi' },
        { key: 'mail', title: 'Mail Agent', description: 'Otomatik mail gonderimi' },
        { key: 'appointment', title: 'Randevu', description: 'Randevu yonetimi' },
      ],
      pricing: { monthly_usd: 59, one_time_usd: null },
      priceUsd: 59,
    },
  ];

  async recommend(data: { profession: string; country?: string }) {
    const filtered = this.packages.filter((p) =>
      p.target_profession.toLowerCase().includes(data.profession.toLowerCase())
    );
    return { packages: filtered.length > 0 ? filtered : this.packages };
  }

  async getById(id: string) {
    return this.packages.find((p) => p.id === id) || null;
  }
}

