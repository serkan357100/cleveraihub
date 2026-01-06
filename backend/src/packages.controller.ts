import { Controller, Get, Param } from '@nestjs/common';

@Controller('packages')
export class PackagesController {
  private mockPackages = [
    {
      id: '1',
      name: 'Emlakçı Otomasyon Paketi',
      summary: 'WhatsApp, CRM ve Otomatik Takip sistemi bir arada.',
      description: 'Emlakçılar için özel olarak tasarlanmış, ilan takibi ve müşteri yönetimi sağlayan tam kapsamlı paket.',
      pricing: { monthly_usd: 29 },
      modules: ['WhatsApp', 'CRM', 'Lead-Followup']
    },
    {
      id: '2',
      name: 'E-Ticaret Destek Paketi',
      summary: 'Müşteri sorularına AI destekli anında cevap sistemi.',
      description: 'Shopify veya Woocommerce mağazanız için 7/24 çalışan AI asistan ve mail otomasyonu.',
      pricing: { monthly_usd: 59 },
      modules: ['AI-Chatbot', 'Mail-Agent', 'CRM']
    }
  ];

  @Get()
  findAll() {
    return this.mockPackages;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const pkg = this.mockPackages.find(p => p.id === id);
    return pkg || { message: 'Paket bulunamadı' };
  }
}
