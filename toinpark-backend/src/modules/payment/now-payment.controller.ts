import { Controller, Get, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";
import { NowPaymentService } from "./now-payment.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard, RolesGuard } from "src/common/guards";

@ApiTags('NOW Payments')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
@Controller('/now-payments')
export class NowPaymentController {
  constructor(
    private readonly paymentService: NowPaymentService,
    
  ) {}

  /**
   * Get available cryptocurrencies
   */
  @HttpCode(HttpStatus.OK)
  @Get('currencies')
  async getCurrencies() {
    return await this.paymentService.getCurrencies();
  }

}