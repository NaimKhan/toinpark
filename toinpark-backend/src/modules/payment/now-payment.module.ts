import { DynamicModule, Module, Controller } from '@nestjs/common';
// import { NowPaymentModuleOptions } from "./now-payment-options.interface";
// import { NOWPAYMENTS_OPTIONS } from "./now-payment.constants";
import { NowPaymentService } from "./now-payment.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { NowPaymentController } from './now-payment.controller';

@Module({})
export class NowPaymentsModule {
  /**
   * Configure NOWPayments module with ConfigService
   * Uses environment variables for API key and IPN secret
   */
  static forRoot(): DynamicModule {
    return {
      module: NowPaymentsModule,
      imports: [ConfigModule],
      providers: [
        {
          provide: 'NOWPAYMENTS_OPTIONS',
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            baseUrl: configService.get<string>('NOWPAYMENTS_BASE_URL', { infer: true }),
            apiKey: configService.get<string>('NOWPAYMENTS_API_KEY', { infer: true }),
            ipnSecret: configService.get<string>('NOWPAYMENTS_IPN_SECRET', { infer: true }),
            email: configService.get<string>('NOWPAYMENTS_EMAIL'),
            password: configService.get<string>('NOWPAYMENTS_PASSWORD'),
          }),
        },
        NowPaymentService,
      ],
      controllers: [NowPaymentController],
      exports: [NowPaymentService],
    };
  }
}
