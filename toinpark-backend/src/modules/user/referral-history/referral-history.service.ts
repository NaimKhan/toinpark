import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/core';
import { ReferralHistory, User } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { DashboardReferralMileStoneResponseDto } from '../dashboard/dto/dashboard-toin-response.dto';

@Injectable()
export class ReferralHistoryService {

    private readonly logger = new Logger(ReferralHistoryService.name);

    constructor(
        private readonly prisma: PrismaService
    ) { }

    async referralMilestoneList(): Promise<DashboardReferralMileStoneResponseDto[]> {

        
        const data = await this.prisma.referralMilestone.findMany({
            where: { isActive: true, deletedAt: null },
            orderBy: { sequenceNumber: 'asc' }
        });

        this.logger.log("get referral milestone list");

        return plainToInstance(DashboardReferralMileStoneResponseDto, data, { excludeExtraneousValues: true });
    }

    async createReferralHistory(referredUsers: User, registerUser: User, milestoneId: string): Promise<void> {

        const referredHistory = {
            userId: registerUser.id,
            referralUserId: referredUsers.id,
            referralCode: referredUsers.referralCode,
            referralMilestoneId: milestoneId,
            isActive: true,
            createdAt: new Date(),
            createdBy: registerUser.id
        } as ReferralHistory;

        await this.prisma.referralHistory.create({ data: referredHistory });

        this.logger.log("referral history created successfully");

    }
}
