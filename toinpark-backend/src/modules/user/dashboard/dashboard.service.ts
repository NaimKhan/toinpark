import { Injectable, Logger } from '@nestjs/common';
import { AirDropEventDTO, LeaderboardRow, LeaderboardRowResponseDto } from './dto/dashboard-toin-response.dto';
import { PrismaService } from 'src/core';
import { plainToInstance } from 'class-transformer';
import { TransactionStatus, TransactionType } from '@prisma/client';
import { toDecimal } from 'src/common/utils/decimal.utils';
import { PaginatedResponseDto } from 'src/common/dto';
import { ReferralProgressResponseDto } from './dto/referral-progress-response.dto';
import { UploadService } from 'src/common/services/upload.service';
import { UserWalletResponseDto } from 'src/modules/member/dto/user-wallet-response.dto';

@Injectable()
export class DashboardService {
    private readonly serviceName = 'DashboardService';

    private readonly logger = new Logger(DashboardService.name);

    // Extracted constant for transaction types
    private readonly AIRDROP_TRANSACTION_TYPES = [
        TransactionType.CHALLENGE_BONUS,
        TransactionType.STAKING_BONUS,
        TransactionType.LEVELING_BONUS,
        TransactionType.ENTRY_BONUS,
        TransactionType.CLAIM_BONUS,
        TransactionType.SOCIAL_REFERRAL,
    ];

    constructor(
        private readonly prisma: PrismaService,
        private readonly uploadService: UploadService
    ) { }


    async getUserToinSummary(userId: string): Promise<UserWalletResponseDto | null> {

        const userWallet = await this.prisma.userWallet.findFirst({
            where: { userId: userId }
        });

        if (!userWallet) {
            return null;
        }

        return plainToInstance(UserWalletResponseDto, userWallet, { excludeExtraneousValues: true });
    }


    async getAirDropEvent(): Promise<AirDropEventDTO | null> {
        
        try {
            const getAirDropEvents = await this.prisma.airDropEvent.findFirst({
                where: {
                    isActive: true,
                }
            });

            if (!getAirDropEvents) {
                return null
            }

            const usesToinResult = await this.prisma.transaction.aggregate({
                _sum: {
                    toinAmount: true,
                },
                where: {
                    trxType: {
                        in: this.AIRDROP_TRANSACTION_TYPES,
                    },
                    trxStatus: TransactionStatus.COMPLETED,
                },
            });

            const totalAmount = parseFloat(getAirDropEvents.totalAmount.toString());
            const usedAmount = usesToinResult?._sum?.toinAmount || 0;

            const responseDto = {
                eventName: getAirDropEvents.eventName,
                totalToinAmount: toDecimal(getAirDropEvents.totalAmount.toString()),
                usesToinAmount: usedAmount,
                usesToinPercent: totalAmount > 0 ? (parseFloat(usedAmount.toString()) / totalAmount) * 100 : 0,

            } as AirDropEventDTO;

            return responseDto;

        } catch (error) {
            
            this.logger.error("unable to get air drop event data", + error);
        }

    }


    async getReferralLink(userId: string): Promise<string | null> {
        const userInfo = await this.prisma.user.findUnique({
            where: { id: userId }
        });

        if (!userInfo) {
            return null;
        }

        return userInfo.referralCode;
    }

    async sendInvitationByEmail(userId: string, email: string): Promise<string> {
        
        try {
            // user information need for if any information required in email body
            const userInfo = await this.prisma.user.findUnique({
                where: { id: userId }
            });

            if (!userInfo) {
                return null;
            }

            const emailFormat = await this.prisma.successOrErrorOrSmsOrEmailText.findFirst({ where: { messageCode: 4002 } });
            
            return emailFormat.emailMessage;

        } catch (error) {
            
            this.logger.error("unable to retrieve mail text", error);
        }

    }



    async invitationClaimed(userId: string): Promise<ReferralProgressResponseDto | null> {
        
        try {
            const userInfo = await this.prisma.user.findUnique({
                where: {
                    id: userId,
                }
            });

            if (!userInfo) {
                return null;
            }

            // Optimized: Use count instead of findMany since we only need the number of referrals
            const referredUsersCount = await this.prisma.user.count({
                where: {
                    referrerId: userInfo.id,
                    OR: [
                        { emailVerified: true },
                        { phoneVerified: true },
                    ]
                }
            });

            return await this.calculateReferralBonus(referredUsersCount);

        } catch (error) {
            this.logger.error("unable to calculate referral bonus")
        }

    }

    private async calculateReferralBonus(totalReferredUsers: number): Promise<ReferralProgressResponseDto> {
        
        try {
            const milestones = await this.prisma.referralMilestone.findMany({
                where: {
                    isActive: true,
                },
                orderBy: {
                    sequenceNumber: 'asc'
                }
            });

            if (milestones.length <= 0) {
                return null;
            }
            // Get last milestone target
            const maxTarget = milestones[milestones.length - 1].targetPerson;

            // Loop the referral number
            const loopValue = totalReferredUsers % maxTarget;  // resets after 20

            // Find active milestone
            for (const milestone of milestones) {
                if (loopValue <= milestone.targetPerson) {
                    const progress = loopValue;

                    const response = {
                        milestone: milestone.referralName,
                        totalRefer: totalReferredUsers,
                        progress: progress < 0 ? 0 : progress,
                        targetPerson: milestone.targetPerson,
                        display: `${progress}/${milestone.targetPerson}`,
                    };

                    return response
                }
            }

            // If exactly equal to max target → start Bronze again (fallback case, though logic above should cover most)
            const response = {
                milestone: milestones[0].referralName,
                totalRefer: totalReferredUsers,
                progress: 0,
                targetPerson: milestones[0].targetPerson,
                display: `0/${milestones[0].targetPerson}`,
            };
            
            return response;
           
        } catch (error) {
            this.logger.error('unable to calcute referral bonus', error);
        }
    }

    async leaderBoard(reqModel: LeaderboardRowResponseDto): Promise<PaginatedResponseDto<LeaderboardRow>> {
        
        try {
            // 1) Group by userId and sum toinAmount
            const grouped = await this.prisma.transaction.groupBy({
                by: ["userId"],
                where: {
                    trxType: TransactionType.LEVELING_BONUS,
                    trxStatus: TransactionStatus.COMPLETED,
                },
                _sum: {
                    toinAmount: true,
                },
                orderBy: {
                    _sum: {
                        toinAmount: "desc",
                    },
                },
                skip: (reqModel.page - 1) * reqModel.limit,
                take: reqModel.limit,
            });

            if (!grouped.length)
            {
                return  new PaginatedResponseDto<LeaderboardRow>([], 0, reqModel.page, reqModel.limit)
            } 
                

            // 2) Fetch profiles for those users (join equivalent)
            const userIds = grouped.map((g) => g.userId);

            const profiles = await this.prisma.userProfile.findMany({
                where: { userId: { in: userIds } },
                select: {
                    userId: true,
                    firstName: true,
                    lastName: true,
                    profileImageUrl: true,
                },
            });

            const profileMap = new Map(profiles.map((p) => [p.userId, p]));

            // 3) Merge result in same order as grouped (already sorted desc)
            let list = await Promise.all(grouped.map(async (g) => {
                const p = profileMap.get(g.userId);
                return {
                    userId: g.userId,
                    firstName: p?.firstName ?? null,
                    lastName: p?.lastName ?? null,
                    profileImageUrl: p?.profileImageUrl ?? null,
                    media: await this.uploadService.getMediaDetails(p?.profileImageUrl) ?? null,
                    totalToin: g._sum.toinAmount ?? 0,
                } as LeaderboardRow;
            }));

            const paginationResult = new PaginatedResponseDto(list, list.length, reqModel.page, reqModel.limit);

            return paginationResult as PaginatedResponseDto<LeaderboardRow>;

        } catch (error) {
            this.logger.error("unable to get leader boardRow", error);
        }

    }



}
