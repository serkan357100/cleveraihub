import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PaymentsService } from './payments/payments.service';
import { PackagesService } from './packages/packages.service';
import { DashboardService } from './dashboard/dashboard.service';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [PaymentsService, PackagesService, DashboardService],
})
export class AppModule {}
