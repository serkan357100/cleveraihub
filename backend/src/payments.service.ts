import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentsService {
  async checkout(data: { packageId: string; paymentMethodId: string }) {
    return {
      success: true,
      message: 'Payment successful (demo)',
      transactionId: 'txn_' + Date.now(),
    };
  }
}
