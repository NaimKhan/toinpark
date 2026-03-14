export const NOWPAYMENTS_OPTIONS = 'NOWPAYMENTS_OPTIONS';

// export const NOWPAYMENTS_API_URL = 'https://api.nowpayments.io/v1';
// export const NOWPAYMENTS_SANDBOX_URL = 'https://api-sandbox.nowpayments.io/v1';

export enum PaymentStatus {
  WAITING = 'waiting',
  CONFIRMING = 'confirming',
  CONFIRMED = 'confirmed',
  SENDING = 'sending',
  PARTIALLY_PAID = 'partially_paid',
  FINISHED = 'finished',
  FAILED = 'failed',
  REFUNDED = 'refunded',
  EXPIRED = 'expired',
}
