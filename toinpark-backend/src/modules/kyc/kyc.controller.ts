import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';
import { CurrentUser, Roles } from 'src/common/decorators';
import { KycService } from './kyc.service';
import { UserResponseDto } from 'src/core/auth/dto/auth.dto';
import { UserEmailOrPhoneOTPResponseDto } from '../user/user-profile/dto/update-user-profile.dto';
import { UserRole } from 'src/common/enums/user-role.enum';
import { otpRequestModelDto } from 'src/core/auth/dto/auth.schema';
import { NewEmailOrPhoneEnterRequestDTO, newEmailOrPhoneEnterRequestModel, newEmailOrPhoneEnterRequestModelDTO, newEmailOrPhoneEnterRequestModelSchema, VerifyOtpDto } from './dto/kyc-response.dto/kyc-response.dto';
import { ZodValidationPipe } from 'src/common/pipes';


@Controller('kyc')
@ApiTags('KYC')
@Roles(UserRole.MEMBER)
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class KycController {

    constructor(private readonly kycService: KycService) { }


    @Get('same-email-or-phone-change-send-otp/:typeOf')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Send OTP old email or phone' })
    @ApiResponse({
        status: 200,
        description: 'Send OTP old email or phone',
        schema: {
            example: {
                success: true,
                statusCode: 200,
                message: 'Send OTP successfully',
                data: null,
                timestamp: '2025-11-12T11:49:49.792Z',
            },
        },
    })
    async sameEmailOrPhoneChangeSendOTPO(@CurrentUser() user: UserResponseDto, @Param('typeOf') typeOf: 'email' | 'phone'): Promise<UserEmailOrPhoneOTPResponseDto> {
        return await this.kycService.sameEmailOrPhoneChangeSendOTPOldEmailOrPhone(user.id, typeOf);
    }

    @Get('cross-check-email-or-phone-change-send-otp/:typeOf')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Send OTP old email or phone' })
    @ApiResponse({
        status: 200,
        description: 'Send OTP old email or phone',
        schema: {
            example: {
                success: true,
                statusCode: 200,
                message: 'Send OTP successfully',
                data: null,
                timestamp: '2025-11-12T11:49:49.792Z',
            },
        },
    })
    async crossCheckEmailOrPhoneChangeSendOTPO(@CurrentUser() user: UserResponseDto, @Param('typeOf') typeOf: 'email' | 'phone'): Promise<UserEmailOrPhoneOTPResponseDto> {
        return await this.kycService.CrossCheckEmailOrPhoneChangeSendOTPOldEmailOrPhone(user.id, typeOf);
    }

    @Post('old-email-or-phone-otp-verification')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Profile OTP Validation' })
    @ApiBody({ type: VerifyOtpDto })
    @ApiResponse({ type: String })
    async oldEmailOrPhoneOTPVerification(@CurrentUser() user: UserResponseDto, @Body() otpRequestModel: VerifyOtpDto): Promise<string> {
        return await this.kycService.oldEmailOrPhoneOTPVerification(user.id, otpRequestModel);
    }

    @Post('new-email-or-phone-received')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'new email or phone' })
    @ApiBody({ type: newEmailOrPhoneEnterRequestModelDTO })
    @ApiResponse({
        status: 200,
        description: 'new email or phone',
        schema: {
            example: {
                success: true,
                statusCode: 200,
                message: 'new email or phone received successfully',
                data: null,
                timestamp: '2025-11-12T11:49:49.792Z',
            },
        },
    })
    //@UsePipes(new ZodValidationPipe(newEmailOrPhoneEnterRequestModelSchema))
    async newEmailOrPhoneReceived(@CurrentUser() user: UserResponseDto, @Body() reqModel: NewEmailOrPhoneEnterRequestDTO): Promise<UserEmailOrPhoneOTPResponseDto> {
        return await this.kycService.newEmailOrPhoneReceived(user.id, reqModel);
    }


    @Post('new-email-or-phone-verified')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Send OTP old email or phone' })
    @ApiBody({ type: VerifyOtpDto })
    @ApiResponse({
        status: 200,
        description: 'Send OTP old email or phone',
        schema: {
            example: {
                success: true,
                statusCode: 200,
                message: 'Send OTP successfully',
                data: null,
                timestamp: '2025-11-12T11:49:49.792Z',
            },
        },
    })
    async newEmailOrPhoneVerified(@CurrentUser() user: UserResponseDto, @Body() reqModel: VerifyOtpDto): Promise<string> {
        return await this.kycService.newEmailOrPhoneVerified(user.id, reqModel);
    }

}
