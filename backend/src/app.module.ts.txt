import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PackagesModule } from './packages/packages.module';
import { PaymentsModule } from './payments/payments.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [AuthModule, PackagesModule, PaymentsModule, DashboardModule],
})
export class AppModule {}
