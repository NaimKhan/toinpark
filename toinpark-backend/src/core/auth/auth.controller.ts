import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UsePipes,
  Get,
  UseGuards,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from '../../common/decorators/public.decorator';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import {
  loginSchema,
  refreshTokenSchema,
  LoginDto,
  RefreshTokenDto,
  RegisterRequestSchema,
  otpRequestModelDto,
  RegisterOTPRequestSchema,
  ResendRegisterOTPRequestSchema,
  ResendRegisterOTPRequestModelDto,
  RegisterDto,
  ForgotPasswordRequestSchema,
  ResetPasswordRequestSchema,
  ForgotPasswordRequestDto,
  ResetPasswordRequestDto,
  ChangePasswordRequestSchema,
  ChangePasswordRequestDto,
} from './dto/auth.schema';
import { AuthResponseDto, ForgotPasswordDto, LoginRequestDto, otpObjectDto, RegisterOTPRequestDto as RegisterOTPRequestDto, reSendRegisterOTPRequestDto, ResetPasswordDto, UserCreateDto, UserRegistrationResponseDto, UserResponseDto } from './dto/auth.dto';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';
import { CurrentUser, Roles } from 'src/common/decorators';
import { UserRole } from 'src/common/enums/user-role.enum';
import { string } from 'zod';
import { RedisService } from '../redis/redis.service';
import { LoginResponseDto } from './dto/login-response.dto';



@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly redisService: RedisService
  ) { }

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  @ApiBody({ type: UserCreateDto })
  @ApiResponse({ type: UserRegistrationResponseDto })
  @UsePipes(new ZodValidationPipe(RegisterRequestSchema))
  async register(@Body() registerDto: RegisterDto): Promise<UserRegistrationResponseDto> {
    return await this.authService.register(registerDto);
  }

  @Public()
  @Post('otp-validation')
  @ApiOperation({ summary: 'Register OTP Validation' })
  @ApiBody({ type: RegisterOTPRequestDto })
  @ApiResponse({ type: AuthResponseDto })
  @UsePipes(new ZodValidationPipe(RegisterOTPRequestSchema))
  async registerOTPValidation(@Body() otpRequestModel: otpRequestModelDto): Promise<any> {
    return await this.authService.registerOtpValidation(otpRequestModel);
  }

  @Public()
  @Post('otp-resend')
  @ApiOperation({ summary: 'Resend OTP' })
  @ApiBody({ type: reSendRegisterOTPRequestDto })
  @ApiResponse({ type: AuthResponseDto })
  @UsePipes(new ZodValidationPipe(ResendRegisterOTPRequestSchema))
  async resendRegisterOTPValidation(@Body() otpRequestModel: ResendRegisterOTPRequestModelDto): Promise<any> {
    const newKey = await this.authService.resendOtpToUser(otpRequestModel.otpUniqueKey);
    return { otpUniqueKey: newKey };
  }

  // Member login Code
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: LoginRequestDto })
  @ApiResponse({ type: LoginResponseDto })
  @ApiResponse({
    status: 400,
    description: 'Account suspended, inactive, or blocked',
    schema: {
      example: {
        message: 'User account is SUSPENDED. Please contact support.',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @UsePipes(new ZodValidationPipe(loginSchema))
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return await this.authService.login(loginDto.identifier, loginDto.password);
  }


  @Post('login-as/:userId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  async loginAs(@Param('userId') userId: string): Promise<LoginResponseDto> {
    return this.authService.loginAsUser(userId);
  }

  @Public()
  @Post('forgot-password')
  @ApiOperation({ summary: 'Send OTP for password reset' })
  @ApiBody({ type: ForgotPasswordDto })
  @UsePipes(new ZodValidationPipe(ForgotPasswordRequestSchema))
  async forgotPassword(@Body() dto: ForgotPasswordRequestDto): Promise<any> {
    const otpUniqueKey = await this.authService.forgotPassword(dto.identifier);
    return { otpUniqueKey };
  }

  @Public()
  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password using OTP' })
  @ApiBody({ type: ResetPasswordDto })
  @UsePipes(new ZodValidationPipe(ResetPasswordRequestSchema))
  async resetPassword(@Body() dto: ResetPasswordRequestDto): Promise<any> {
    await this.authService.resetPassword(dto);
    return { message: 'Password reset successful' };
  }

  @Post('change-password')
  @ApiOperation({ summary: 'Reset password using OTP' })
  @ApiBody({ type: ResetPasswordDto })
  @UsePipes(new ZodValidationPipe(ChangePasswordRequestSchema))
  async changePassword(@Body() dto: ChangePasswordRequestDto, @CurrentUser() user: UserResponseDto): Promise<any> {
    await this.authService.changePassword(dto, user.id);
    return { message: 'Password reset successful' };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({
    status: 200,
    description: 'Logged out successfully',
    type: string,
  })
  async logout(@CurrentUser() user: UserResponseDto): Promise<string> {
    // Optional: Clean up any user session data
    await this.authService.logout(user);
    return 'Logged out successfully';
  }



  @Public()
  @Get('otp-history')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'OTP History' })
  @ApiResponse({ type: otpObjectDto })
  async otpHistory(): Promise<otpObjectDto[]> {
    return await this.authService.getAllKeysWithValues();
  }


  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        refreshToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
      },
      required: ['refreshToken'],
    },
  })
  @UsePipes(new ZodValidationPipe(refreshTokenSchema))
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }

}