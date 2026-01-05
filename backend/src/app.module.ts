import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { PaymentsModule } from './payments.module';
import { PackagesModule } from './packages.module';
import { DashboardModule } from './dashboard.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    AuthModule,
    PaymentsModule,
    PackagesModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
