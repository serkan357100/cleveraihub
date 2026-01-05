import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentsService {
  async checkout(data: { packageId: string; paymentMethodId: string }) {
    // Demo: gerçekte Stripe/PayPal entegrasyonu
    return {
      success: true,
      message: 'Ödeme baþarýlý (demo)',
      transactionId: txn_${Date.now()},
    };
  }
}
