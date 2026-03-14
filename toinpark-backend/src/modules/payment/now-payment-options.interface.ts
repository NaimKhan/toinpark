import { PaymentStatus } from './now-payment.constants';

export interface NowPaymentModuleOptions {
  apiKey: string;
  baseUrl?: string;
  ipnSecret?: string;

  // Auth credentials for payout operations
  email?: string;
  password?: string;
}

export interface ApiStatusResponse {
  message: string;
}

export interface CurrenciesResponse {
  currencies: string[];
}

export interface MinimumAmountResponse {
  currency_from: string;
  currency_to: string;
  min_amount: number;
}

export interface EstimatedPriceResponse {
  currency_from: string;
  amount_from: number;
  currency_to: string;
  estimated_amount: number;
}

export interface CreatePaymentResponse {
  payment_id: string;
  payment_status: PaymentStatus;
  pay_address: string;
  price_amount: number;
  price_currency: string;
  pay_amount: number;
  pay_currency: string;
  order_id?: string;
  order_description?: string;
  ipn_callback_url?: string;
  created_at: string;
  updated_at: string;
  purchase_id: string;
  amount_received?: number;
  payin_extra_id?: string;
  smart_contract?: string;
  network?: string;
  network_precision?: number;
  time_limit?: string;
  burning_percent?: number;
  expiration_estimate_date?: string;
}

export interface PaymentStatusResponse {
  payment_id: string;
  payment_status: PaymentStatus;
  pay_address: string;
  price_amount: number;
  price_currency: string;
  pay_amount: number;
  actually_paid?: number;
  pay_currency: string;
  order_id?: string;
  order_description?: string;
  purchase_id: string;
  created_at: string;
  updated_at: string;
  outcome_amount?: number;
  outcome_currency?: string;
  payin_hash?: string;
  payin_extra_id?: string;
  payout_hash?: string;
  amount_received?: number;
  type?: string;
  payment_extra_id?: string;
}

export interface InvoiceResponse {
  id: string;
  token_id: string;
  order_id: string;
  order_description: string;
  price_amount: number;
  price_currency: string;
  pay_currency: string | null;
  ipn_callback_url: string;
  invoice_url: string;
  success_url: string;
  cancel_url: string;
  partially_paid_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface PaymentListResponse {
  data: PaymentStatusResponse[];
  page: number;
  pages: number;
  total: number;
}


// payout interfaces
export interface AuthResponse {
  token: string;
}

export interface PayoutWithdrawal {
  address: string;
  currency: string;
  amount: number;
  ipn_callback_url?: string;
  fiat_amount?: number;
  fiat_currency?: string;
  extra_id?: string;
}

export interface PayoutWithdrawalResponse {
  id: string;
  address: string;
  currency: string;
  amount: number;
  batch_withdrawal_id: string;
  status: PayoutStatus;
  extra_id?: string;
  hash?: string;
  error?: string;
}

export interface PayoutResponse {
  id: string;
  withdrawals: PayoutWithdrawalResponse[];
}

export interface PayoutStatusResponse {
  id: string;
  status: PayoutStatus;
  withdrawals: PayoutWithdrawalResponse[];
}

export type PayoutStatus =
  | 'CREATING'
  | 'PROCESSING'
  | 'SENDING'
  | 'FINISHED'
  | 'FAILED'
  | 'REJECTED';
