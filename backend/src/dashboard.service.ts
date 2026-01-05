import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  async getDashboard() {
    return {
      packages: [
        { id: '1', name: 'Emlakci Starter', status: 'active', priceUsd: 29 },
      ],
      revenue: { totalEarnings: 150, creatorShare: 112.5, platformShare: 37.5 },
      notifications: [
        { id: '1', message: 'Yeni satis: Emlakci Starter', createdAt: new Date().toISOString() },
      ],
    };
  }
}
