import { Controller, Get } from '@nestjs/common';

@Controller('dashboard')
export class DashboardController {
  @Get()
  getDashboard() {
    return {
      activeSubscriptions: 0,
      totalEarnings: 0,
      notificationsCount: 0,
    };
  }
}
