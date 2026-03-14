import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '../../config/config.service';
import { RedisModule } from '../redis/redis.module';
import { MailModule } from '../mail/mail.module';
import { SmsModule } from '../sms/sms.module';
import { EncryptionService } from 'src/common/services/EncryptionService';
import { UserTransactionModule } from 'src/modules/transaction/transaction.module';
import { ReferralHistoryModule } from 'src/modules/user/referral-history/referral-history.module';


@Module({
  imports: [
    RedisModule,
    MailModule,
    SmsModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const expiresIn = configService.jwtExpiresIn;
        return {
          secret: configService.jwtSecret,
          signOptions: {
            expiresIn: expiresIn,
          },
        };
      },
    }),
    UserTransactionModule,
    ReferralHistoryModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, EncryptionService],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule { }
