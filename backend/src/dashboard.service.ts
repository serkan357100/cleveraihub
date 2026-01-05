import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  async getDashboard() {
    return {
      packages: [
        { id: '1', name: 'Emlakçý Starter', status: 'active', priceUsd: 29 },
      ],
      revenue: {
        totalEarnings: 150,
        creatorShare: 112.5,
        platformShare: 37.5,
      },
      notifications: [
        { id: '1', message: 'Yeni satýþ: Emlakçý Starter', createdAt: new Date().toISOString() },
      ],
    };
  }
}
