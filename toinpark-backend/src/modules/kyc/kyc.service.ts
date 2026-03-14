import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserEmailOrPhoneOTPResponseDto } from '../user/user-profile/dto/update-user-profile.dto';
import { AuthService, PrismaService } from 'src/core';
import { EncryptionService } from 'src/common/services/EncryptionService';
import { ValidationException } from 'src/common/exceptions';
import { plainToInstance } from 'class-transformer';
import { OtpFor } from 'src/common/enums/all-enum';
import { otpObjectDto, UserResponseDto } from 'src/core/auth/dto/auth.dto';
import { otpRequestModelDto } from 'src/core/auth/dto/auth.schema';
import { RedisService } from 'src/core/redis/redis.service';
import { TransactionService as UserTransactionService } from '../transaction/transaction.service';
import { newEmailOrPhoneEnterRequestModel } from './dto/kyc-response.dto/kyc-response.dto';

@Injectable()
export class KycService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly authService: AuthService,
        private readonly cryptoService: EncryptionService,
        private readonly redisService: RedisService,
        private readonly transactionService: UserTransactionService,
        private readonly configService: ConfigService,
    ) { }

    async sameEmailOrPhoneChangeSendOTPOldEmailOrPhone(userId: string, typeOf: 'email' | 'phone'): Promise<UserEmailOrPhoneOTPResponseDto> {

        const user = await this.prismaService.user.findFirst({
            where: { id: userId },
            include: { userProfile: true }
        });

        if (!user) {
            throw new ValidationException({ identifier: ['User not found.'] });
        }

        if (typeOf == 'email' && (!user.emailVerified || user.email == null)) {
            throw new ValidationException({ identifier: ['User email not verified or email not found.'] });
        }

        if (typeOf == 'phone' && (!user.phoneVerified || user.phoneNumber == null)) {
            throw new ValidationException({ identifier: ['User phone not verified or phone not found.'] });
        }

        // Check change limits
        if (typeOf === 'email') {
            const maxEmailChanges = this.configService.get<number>('MAX_EMAIL_CHANGE_COUNT') || 3;
            if ((user.emailChangingCount || 0) >= maxEmailChanges) {
                throw new ValidationException({ identifier: ['Email change limit exceeded. Please contact support for assistance.'] });
            }
        } else {
            const maxPhoneChanges = this.configService.get<number>('MAX_PHONE_CHANGE_COUNT') || 3;
            if ((user.phoneChangingCount || 0) >= maxPhoneChanges) {
                throw new ValidationException({ identifier: ['Phone number change limit exceeded. Please contact support for assistance.'] });
            }
        }

        //Log
        var logInfo = await this.prismaService.userChangeHistoryForEmailOrPhone.create({
            data: {
                userId: userId,
                changeType: 'Started',
                userName: user.username,
                fullName: `${user.userProfile.firstName} ${user.userProfile.lastName}`,
                requestedAt: new Date(),
                oldValue: typeOf === 'email' ? user.email : user.phoneNumber,
                newValue: null,
                createdAt: new Date(),
                createdBy: userId,

            }
        })

        // if we get email then we send otp to Phone else we send otp to email for cross verification
        let userResponseDto = plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true });
        let key = await this.authService.sendOtpToUser(userResponseDto, typeOf, OtpFor.VerifiedProfilePhoneOrEmail, logInfo.id);



        return {
            uniqueKey: key,
            identifier: typeOf,
            emailOrPhone: this.cryptoService.maskValue(typeOf === 'email' ? user.email : user.phoneNumber, typeOf),
        } as UserEmailOrPhoneOTPResponseDto;
    }



    async CrossCheckEmailOrPhoneChangeSendOTPOldEmailOrPhone(userId: string, typeOf: 'email' | 'phone'): Promise<UserEmailOrPhoneOTPResponseDto> {
        const user = await this.prismaService.user.findFirst({
            where: { id: userId },
            include: { userProfile: true }
        });

        if (!user) {
            throw new ValidationException({ identifier: ['User not found.'] });
        }

        if (!user.emailVerified || !user.phoneVerified) {
            throw new ValidationException({ identifier: ['User not verified. Please verify both your email and phone number first.'] });
        }

        // Check change limits
        // If typeOf is email, it means they are using phone to verify an email change (or vice versa? Logic check)
        // In sameEmailOrPhoneChangeSendOTPOldEmailOrPhone, typeOf is the one BEING CHANGED.
        // In CrossCheckEmailOrPhoneChangeSendOTPOldEmailOrPhone, let's see which one is being changed.
        // Line 116 says: emailOrPhone: this.cryptoService.maskValue(typeOf === 'email' ? user.phoneNumber : user.email, typeOf === 'email' ? 'phone' : 'email'),
        // If typeOf is 'email', we mask phoneNumber (which is the verification method). So the one being changed is PHONE.
        // Wait, line 102: oldValue: typeOf === 'email' ? user.phoneNumber : user.email,
        // So if typeOf is 'email', the thing being changed is PHONE. (Cross-verification: use email to verify phone change)
        if (typeOf === 'email') {
            // Changing PHONE
            const maxPhoneChanges = this.configService.get<number>('MAX_PHONE_CHANGE_COUNT') || 3;
            if ((user.phoneChangingCount || 0) >= maxPhoneChanges) {
                throw new ValidationException({ identifier: ['Phone number change limit exceeded. Please contact support for assistance.'] });
            }
        } else {
            // Changing EMAIL
            const maxEmailChanges = this.configService.get<number>('MAX_EMAIL_CHANGE_COUNT') || 3;
            if ((user.emailChangingCount || 0) >= maxEmailChanges) {
                throw new ValidationException({ identifier: ['Email change limit exceeded. Please contact support for assistance.'] });
            }
        }

        //Log
        var logInfo = await this.prismaService.userChangeHistoryForEmailOrPhone.create({
            data: {
                userId: userId,
                changeType: 'Started',
                userName: user.username,
                fullName: `${user.userProfile.firstName} ${user.userProfile.lastName}`,
                requestedAt: new Date(),
                oldValue: typeOf === 'email' ? user.phoneNumber : user.email,
                newValue: null,
                createdAt: new Date(),
                createdBy: userId,

            }
        })

        // if we get email then we send otp to Phone else we send otp to email for cross verification
        let userResponseDto = plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true });
        let key = await this.authService.sendOtpToUser(userResponseDto, typeOf, OtpFor.VerifiedProfilePhoneOrEmail, logInfo.id);
        return {
            uniqueKey: key,
            identifier: typeOf,
            emailOrPhone: this.cryptoService.maskValue(typeOf === 'email' ? user.phoneNumber : user.email, typeOf === 'email' ? 'phone' : 'email'),
        } as UserEmailOrPhoneOTPResponseDto;
    }


    async oldEmailOrPhoneOTPVerification(userId: string, requestDto: otpRequestModelDto): Promise<string> {
        requestDto.otpUniqueKey = this.cryptoService.decrypt(requestDto.otpUniqueKey);

        const splitKey = requestDto.otpUniqueKey.split("_");
        const param = splitKey[4];

        const isVerified = await this.verifyProfileOTP(requestDto);
        var getLogInfo = await this.prismaService.userChangeHistoryForEmailOrPhone.findFirst({ where: { id: param } });
        getLogInfo.changeType = 'Pending';
        getLogInfo.updatedAt = new Date();
        getLogInfo.updatedBy = userId;
        await this.prismaService.userChangeHistoryForEmailOrPhone.update({ where: { id: param }, data: getLogInfo });
        return getLogInfo.id;
    }


    async newEmailOrPhoneReceived(userId: string, reqModel: newEmailOrPhoneEnterRequestModel): Promise<UserEmailOrPhoneOTPResponseDto> {
        let user = await this.prismaService.user.findFirst({ where: { id: userId }, include: { userProfile: true } });

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        if (reqModel.newEmailOrPhone == user.email || reqModel.newEmailOrPhone == user.phoneNumber) {
            throw new UnauthorizedException('User already exists with this email or phone');
        }

        let checkUserEmailOrPhone = await this.prismaService.user.findFirst({
            where: {
                OR: [
                    { email: reqModel.newEmailOrPhone },
                    { phoneNumber: reqModel.newEmailOrPhone },
                ],
            },
        });

        if (checkUserEmailOrPhone) {
            throw new UnauthorizedException(`User already exists with this ${reqModel.newEmailOrPhone.includes('@') ? 'email' : 'phone'}`);
        }

        if (reqModel.newEmailOrPhone.includes('@')) {
            const maxEmailChanges = this.configService.get<number>('MAX_EMAIL_CHANGE_COUNT') || 3;
            if ((user.emailChangingCount || 0) >= maxEmailChanges) {
                throw new ValidationException({ identifier: ['Email change limit exceeded. Please contact support for assistance.'] });
            }
            user.email = reqModel.newEmailOrPhone
        }
        else {
            const maxPhoneChanges = this.configService.get<number>('MAX_PHONE_CHANGE_COUNT') || 3;
            if ((user.phoneChangingCount || 0) >= maxPhoneChanges) {
                throw new ValidationException({ identifier: ['Phone number change limit exceeded. Please contact support for assistance.'] });
            }
            user.phoneNumber = reqModel.newEmailOrPhone
        }

        let logInfo = null;

        if (reqModel.logId != null && reqModel.logId != '') {
            //Log
            var getLogInfo = await this.prismaService.userChangeHistoryForEmailOrPhone.findFirst({ where: { id: reqModel.logId } });
            if (getLogInfo == null) {
                throw new UnauthorizedException('invalid process detected');
            }
            getLogInfo.newValue = reqModel.newEmailOrPhone;
            getLogInfo.updatedAt = new Date();
            getLogInfo.updatedBy = userId;
            await this.prismaService.userChangeHistoryForEmailOrPhone.update({ where: { id: reqModel.logId }, data: getLogInfo });
        }
        else {
            //Log
            logInfo = await this.prismaService.userChangeHistoryForEmailOrPhone.create({
                data: {
                    userId: userId,
                    changeType: 'Started',
                    userName: user.username,
                    fullName: `${user.userProfile.firstName} ${user.userProfile.lastName}`,
                    requestedAt: new Date(),
                    oldValue: null,
                    newValue: reqModel.newEmailOrPhone,
                    createdAt: new Date(),
                    createdBy: userId,

                }
            })
        }


        // if we get email then we send otp to Phone else we send otp to email for cross verification
        let userResponseDto = plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true });
        let key = await this.authService.sendOtpToUser(userResponseDto, reqModel.newEmailOrPhone.includes('@') ? 'email' : 'phone', OtpFor.VerifiedProfilePhoneOrEmail, reqModel.logId ? reqModel.logId : logInfo.id);
        return {
            uniqueKey: key,
            identifier: reqModel.newEmailOrPhone.includes('@') ? 'email' : 'phone',
            emailOrPhone: this.cryptoService.maskValue(reqModel.newEmailOrPhone, reqModel.newEmailOrPhone.includes('@') ? 'email' : 'phone'),
        } as UserEmailOrPhoneOTPResponseDto;
    }

    async newEmailOrPhoneVerified(userId: string, requestDto: otpRequestModelDto): Promise<string> {
        requestDto.otpUniqueKey = this.cryptoService.decrypt(requestDto.otpUniqueKey);
        const splitKey = requestDto.otpUniqueKey.split("_");
        const emailOrPhone = splitKey[0].split(":")[1];
        const userIdFromKey = splitKey[2];
        const param = splitKey[4];

        let userInfo = await this.prismaService.user.findUnique({ where: { id: userIdFromKey } });

        if (!userInfo) {
            throw new UnauthorizedException('User not found');
        }

        let checkUserEmailOrPhone = await this.prismaService.user.findFirst({
            where: {
                OR: [
                    { email: emailOrPhone },
                    { phoneNumber: emailOrPhone },
                ],
            },
        });

        if (checkUserEmailOrPhone) {
            throw new UnauthorizedException(`User already exists with this ${emailOrPhone.includes('@') ? 'email' : 'phone'}`);
        }

        const isVerified = await this.verifyProfileOTP(requestDto);

        if (userIdFromKey != userId) {
            throw new UnauthorizedException('invalid unique key');
        }
        //Log
        var getLogInfo = await this.prismaService.userChangeHistoryForEmailOrPhone.findFirst({ where: { id: param } });
        if (getLogInfo == null) {
            throw new UnauthorizedException('invalid email or phone');
        }
        getLogInfo.verifiedAt = new Date();
        getLogInfo.updatedAt = new Date();
        getLogInfo.updatedBy = userId;
        getLogInfo.changeType = 'Verified';
        await this.prismaService.userChangeHistoryForEmailOrPhone.update({ where: { id: param }, data: getLogInfo });

        let user = null;
        if (isVerified) {
            if (emailOrPhone.includes('@')) {
                const maxEmailChanges = this.configService.get<number>('MAX_EMAIL_CHANGE_COUNT') || 3;
                if ((userInfo.emailChangingCount || 0) >= maxEmailChanges) {
                    throw new ValidationException({ identifier: ['Email change limit exceeded. Please contact support for assistance.'] });
                }
                userInfo.email = emailOrPhone;
                userInfo.emailVerified = true;
                userInfo.emailVerifiedAt = new Date();
                userInfo.emailChangingCount = userInfo.emailChangingCount + 1;
                user = await this.prismaService.user.update({
                    where: { id: userId }, data: userInfo
                });
            }
            else {
                const maxPhoneChanges = this.configService.get<number>('MAX_PHONE_CHANGE_COUNT') || 3;
                if ((userInfo.phoneChangingCount || 0) >= maxPhoneChanges) {
                    throw new ValidationException({ identifier: ['Phone number change limit exceeded. Please contact support for assistance.'] });
                }
                userInfo.phoneNumber = emailOrPhone;
                userInfo.phoneVerified = true;
                userInfo.phoneVerifiedAt = new Date();
                userInfo.phoneChangingCount = userInfo.phoneChangingCount + 1;
                user = await this.prismaService.user.update({
                    where: { id: userId }, data: userInfo
                });
            }

            if (!user.isKycVerified && user.emailVerified && user.phoneVerified) {

                // Grant KYC bonus
                await this.transactionService.createKYCBonusTransaction(user.id);

                await this.prismaService.user.update({
                    where: { id: user.id },
                    data: { isKycVerified: true },
                });

                return "KYC is Completed";
            } else {
                var getLogInfo = await this.prismaService.userChangeHistoryForEmailOrPhone.findFirst({ where: { id: param } });
                getLogInfo.changeType = 'Completed';
                getLogInfo.updatedAt = new Date();
                getLogInfo.updatedBy = userId;
                await this.prismaService.userChangeHistoryForEmailOrPhone.update({ where: { id: param }, data: getLogInfo });

                return `${emailOrPhone.includes('@') ? 'Email' : 'Phone'} is changed successfully`;
            }
        }
    }

    async verifyProfileOTP(requestDto: otpRequestModelDto): Promise<boolean> {
        // OTP is correct, proceed to fetch user
        const splitKey = requestDto.otpUniqueKey.split("_");

        const otpData = await this.redisService.get<otpObjectDto>(requestDto.otpUniqueKey);

        if (!otpData) {
            throw new ValidationException({
                otp: ['OTP has expired or is invalid. Please request a new OTP.'],
            });
        }

        // Convert otpFailCount to number for comparison
        const maxFailCount = Number(otpData.otpFailCount || 5);


        // OTP mismatch
        if (otpData.otp.toString() !== requestDto.otp.toString()) {

            otpData.otpFailCount = (otpData.otpFailCount || 0) + 1;
            // Save updated fail count back to Redis
            await this.redisService.set(requestDto.otpUniqueKey, otpData, 300);

            if (otpData.otpFailCount >= maxFailCount) {

                throw new ValidationException({
                    otp: ['Maximum OTP attempts exceeded. Please request a new OTP.'],
                })
            }

            throw new ValidationException({
                otp: ['Invalid OTP. Please try again.'],
            })
        }

        return true;
    }


}
