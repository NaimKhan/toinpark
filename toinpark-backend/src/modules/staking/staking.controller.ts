import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards, Headers } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';
import { StakingService } from './staking.service';
import { UserStakingPackageDTO } from './dto/staking-package-response.dto';
import { CurrentUser, Public, Roles } from 'src/common/decorators';

import { CreateStakingDto } from './dto/create-staking.dto';
import { UserResponseDto } from 'src/core/auth/dto/auth.dto';
import { InvoiceResponse } from '../payment/now-payment-options.interface';
import { UserRole } from 'src/common/enums/user-role.enum';
import { IpnCallbackDto } from '../payment/dto/now-payment.dto';
import { CommissionService } from './commision.service';



@ApiTags('Staking')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
@Controller('staking')
export class StakingController {

    constructor(private readonly service: StakingService,
                private readonly commissionService: CommissionService
    ) {

    }


    @Post()
    @Roles(UserRole.MEMBER)
    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: CreateStakingDto })
    @ApiOperation({ summary: 'Buy Staking Package' })
    @ApiResponse({
        status: 200,
        description: 'User staking package result or error DTO',
        type: Object,
    })
    async buyStakingPackage(@CurrentUser() user: UserResponseDto, @Body() createStakingDto: CreateStakingDto): Promise<InvoiceResponse> {
        return this.service.buyStakingPackage(createStakingDto, user.id);
    }

    @Public()
    @Post('payment-webhook')
    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: IpnCallbackDto })
    async handlePaymentWebhook(
        @Body() body: any,
        @Headers('x-nowpayments-sig') signature: string,
    ): Promise<{ status: string }> {
        await this.service.handlePaymentWebhook(body, signature);
        return { status: 'ok' };
    }

    @Get('payment-status/:transactionId')
    @UseGuards(JwtAuthGuard)
    async checkPaymentStatus(
    @Param('transactionId') transactionId: string,
    ): Promise<UserStakingPackageDTO | null> {
        return this.service.checkPaymentStatus(transactionId);
    }


    @Get('process-commission-and-leveling-bonuses')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'manually process commission and leveling bonuses' })
    async commissionLevelingProcessJob() {
        return this.commissionService.processCommissionAndLevelingBonuses();
    }

}
