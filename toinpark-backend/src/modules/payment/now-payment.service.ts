import { Injectable, Inject, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { NOWPAYMENTS_OPTIONS } from './now-payment.constants';
import {
  NowPaymentModuleOptions,
  ApiStatusResponse,
  CurrenciesResponse,
  MinimumAmountResponse,
  EstimatedPriceResponse,
  CreatePaymentResponse,
  PaymentStatusResponse,
  InvoiceResponse,
  PaymentListResponse,
  PayoutResponse,
  PayoutStatusResponse,
} from './now-payment-options.interface';

import {
  CreatePaymentDto,
  CreateInvoiceDto,
  GetMinimumAmountDto,
  GetEstimatedPriceDto,
  GetPaymentListDto,
  CreatePayoutDto,
} from './dto/now-payment.dto';

import * as crypto from 'crypto';

@Injectable()
export class NowPaymentService {
  private readonly logger = new Logger(NowPaymentService.name);
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly ipnSecret?: string;
  private readonly email?: string;
  private readonly password?: string;
  private jwtToken?: string;
  private tokenExpiresAt?: Date;

  constructor(
    @Inject(NOWPAYMENTS_OPTIONS)
    private readonly options: NowPaymentModuleOptions,
  ) {
    this.baseUrl = options.baseUrl || 'https://api.nowpayments.io/v1';
    this.apiKey = options.apiKey;
    this.ipnSecret = options.ipnSecret;
    this.email = options.email;
    this.password = options.password;
  }

  /**
   * Make HTTP request to NOWPayments API
   */
  private async makeRequest<T>(
    endpoint: string,
    method: 'GET' | 'POST' = 'GET',
    data?: any,
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: Record<string, string> = {
      'x-api-key': this.apiKey,
      'Content-Type': 'application/json',
    };

    this.logger.debug(`Making request to NOWPayments API: ${method} ${url}`);

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
      });

      const responseData = await response.json();

      if (!response.ok) {
        this.logger.error(`API Error: ${response.status} - ${JSON.stringify(responseData)}`);
        throw new HttpException(
          responseData.message || 'NOWPayments API request failed',
          response.status,
        );
      }

      return responseData as T;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      this.logger.error(`Request failed: ${error.message}`);
      throw new HttpException(
        'Failed to communicate with NOWPayments API',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

    /**
   * Authenticate to get JWT token (required for payouts)
   * Uses credentials from environment if not provided
   */
  async authenticate(email?: string, password?: string): Promise<string> {
    const authEmail = email || this.email;
    const authPassword = password || this.password;

    if (!authEmail || !authPassword) {
      throw new HttpException(
        'Authentication credentials not provided. Set NOWPAYMENTS_EMAIL and NOWPAYMENTS_PASSWORD in environment.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const url = `${this.baseUrl}/auth`;
    const headers: Record<string, string> = {
      'x-api-key': this.apiKey,
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ email: authEmail, password: authPassword }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        this.logger.error(`Auth Error: ${response.status} - ${JSON.stringify(responseData)}`);
        throw new HttpException(
          responseData.message || 'Authentication failed',
          response.status,
        );
      }

      this.jwtToken = responseData.token;
      // Token typically expires in 5 minutes, refresh before that
      this.tokenExpiresAt = new Date(Date.now() + 4 * 60 * 1000);
      
      return this.jwtToken;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      this.logger.error(`Authentication failed: ${error.message}`);
      throw new HttpException(
        'Failed to authenticate with NOWPayments API',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  /**
   * Get valid JWT token, refreshing if needed
   */
  private async getValidToken(): Promise<string> {
    if (!this.jwtToken || !this.tokenExpiresAt || new Date() >= this.tokenExpiresAt) {
      await this.authenticate();
    }
    return this.jwtToken!;
  }

  /**
   * Make authenticated request (with JWT token for payouts)
   */
  private async makeAuthenticatedRequest<T>(
    endpoint: string,
    method: 'GET' | 'POST' = 'GET',
    data?: any,
  ): Promise<T> {
    const token = await this.getValidToken();

    const url = `${this.baseUrl}${endpoint}`;
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${token}`,
      'x-api-key': this.apiKey,
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
      });

      const responseData = await response.json();

      if (!response.ok) {
        this.logger.error(`API Error: ${response.status} - ${JSON.stringify(responseData)}`);
        throw new HttpException(
          responseData.message || 'NOWPayments API request failed',
          response.status,
        );
      }

      return responseData as T;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      this.logger.error(`Request failed: ${error.message}`);
      throw new HttpException(
        'Failed to communicate with NOWPayments API',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }


  /**
   * Check API status
   */
  async getApiStatus(): Promise<ApiStatusResponse> {
    return this.makeRequest<ApiStatusResponse>('/status');
  }

  /**
   * Get list of available currencies
   */
  async getCurrencies(): Promise<string[]> {
    return this.makeRequest<string[]>('/currencies');
  }

  /**
   * Get list of available currencies with full info
   */
  async getFullCurrencies(): Promise<any> {
    return this.makeRequest<any>('/full-currencies');
  }

  /**
   * Get available currencies for a specific currency
   */
  async getAvailableCurrencies(currency: string): Promise<CurrenciesResponse> {
    return this.makeRequest<CurrenciesResponse>(`/merchant/coins?currency=${currency}`);
  }

  /**
   * Get minimum payment amount
   */
  async getMinimumAmount(params: GetMinimumAmountDto): Promise<MinimumAmountResponse> {
    const query = new URLSearchParams({
      currency_from: params.currency_from,
      ...(params.currency_to && { currency_to: params.currency_to }),
    });

    return this.makeRequest<MinimumAmountResponse>(`/min-amount?${query.toString()}`);
  }

  /**
   * Get estimated price
   */
  async getEstimatedPrice(params: GetEstimatedPriceDto): Promise<EstimatedPriceResponse> {
    const query = new URLSearchParams({
      amount: params.amount.toString(),
      currency_from: params.currency_from,
      currency_to: params.currency_to,
    });

    return this.makeRequest<EstimatedPriceResponse>(`/estimate?${query.toString()}`);
  }

  /**
   * Create a payment
   */
  async createPayment(paymentDto: CreatePaymentDto): Promise<CreatePaymentResponse> {
    return this.makeRequest<CreatePaymentResponse>('/payment', 'POST', paymentDto);
  }

  /**
   * Get payment status
   */
  async getPaymentStatus(paymentId: string | number): Promise<PaymentStatusResponse> {
    return this.makeRequest<PaymentStatusResponse>(`/payment/${paymentId}`);
  }

  /**
   * Get list of payments
   */
  async getPaymentList(params?: GetPaymentListDto): Promise<PaymentListResponse> {
    if (!params) {
      return this.makeRequest<PaymentListResponse>('/payment');
    }

    const query = new URLSearchParams();
    if (params.limit) query.append('limit', params.limit.toString());
    if (params.page) query.append('page', params.page.toString());
    if (params.sortBy) query.append('sortBy', params.sortBy);
    if (params.orderBy) query.append('orderBy', params.orderBy);
    if (params.dateFrom) query.append('dateFrom', params.dateFrom);
    if (params.dateTo) query.append('dateTo', params.dateTo);

    return this.makeRequest<PaymentListResponse>(`/payment?${query.toString()}`);
  }

  /**
   * Create an invoice
   */
  async createInvoice(invoiceDto: CreateInvoiceDto): Promise<InvoiceResponse> {
    return this.makeRequest<InvoiceResponse>('/invoice', 'POST', invoiceDto);
  }

  /**
   * Verify IPN callback signature
   */
  verifyIpnSignature(receivedData: any, receivedSignature: string): boolean {
    if (!this.ipnSecret) {
      this.logger.warn('IPN secret not configured. Skipping signature verification.');
      return false;
    }

    try {
      // Sort the data keys and create signature string
      const sortedData = Object.keys(receivedData)
        .sort()
        .reduce((result, key) => {
          result[key] = receivedData[key];
          return result;
        }, {} as Record<string, any>);

      const hmac = crypto.createHmac('sha512', this.ipnSecret);
      hmac.update(JSON.stringify(sortedData));
      const calculatedSignature = hmac.digest('hex');

      return calculatedSignature === receivedSignature;
    } catch (error) {
      this.logger.error(`IPN signature verification failed: ${error.message}`);
      return false;
    }
  }

  /**
   * Update estimated price (for fixed rate payments)
   */
  async updateEstimatedPrice(paymentId: string | number): Promise<EstimatedPriceResponse> {
    return this.makeRequest<EstimatedPriceResponse>(`/payment/${paymentId}`, 'POST');
  }

  // ============ Payout methods ============

  /**
   * Create a payout (mass withdrawal)
   * Automatically handles authentication
   */
  async createPayout(payoutDto: CreatePayoutDto): Promise<PayoutResponse> {
    return this.makeAuthenticatedRequest<PayoutResponse>('/payout', 'POST', payoutDto);
  }

  /**
   * Get payout status
   */
  async getPayoutStatus(payoutId: string): Promise<PayoutStatusResponse> {
    return this.makeAuthenticatedRequest<PayoutStatusResponse>(`/payout/${payoutId}`);
  }

  /**
   * Verify payout with 2FA code (if required by account settings)
   */
  async verifyPayout(payoutId: string, verificationCode: string): Promise<PayoutResponse> {
    return this.makeAuthenticatedRequest<PayoutResponse>(
      `/payout/${payoutId}/verify`,
      'POST',
      { verification_code: verificationCode },
    );
  }

}
