// src/modules/dashboard/dashboard.service.ts
import { Injectable } from '@nestjs/common';
import { TransactionType, TransactionStatus, WithdrawalStatus } from '@prisma/client';
import { DashboardStatsResponseDto, MonthlyUserRegistrationDto, UserRegistrationGraphResponseDto } from './dto/dashboard-stats-response.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class AdminDashboardService {

private readonly monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

constructor(private readonly prisma: PrismaService) {}

async getDashboardStats(): Promise<DashboardStatsResponseDto> {
    const [
        totalRegisteredUsers,
        totalInvestmentAmount,
        levelIncome,
        roiLevelIncome,
        totalWithdrawalAmount,
    ] = await Promise.all([
        this.getTotalRegisteredUsers(),
        this.getTotalInvestmentAmount(),
        this.getLevelIncome(),
        this.getRoiLevelIncome(),
        this.getTotalWithdrawalAmount(),
    ]);

    const response = new DashboardStatsResponseDto();
    response.totalRegisteredUsers = totalRegisteredUsers;
    response.totalInvestmentAmount = totalInvestmentAmount;
    response.levelIncome = levelIncome;
    response.roiLevelIncome = roiLevelIncome;
    response.totalWithdrawalAmount = totalWithdrawalAmount;

    return response;
}

private async getTotalRegisteredUsers(): Promise<number> {
    return this.prisma.user.count({
        where: {
            deletedAt: null,
        },
    });
}

private async getTotalInvestmentAmount(): Promise<{
    toinAmount: number;
    usdtAmount: number;
}> {
    const result = await this.prisma.userStakingPackage.aggregate({
        _sum: {
            toinAmount: true,
            usdtAmount: true,
        },
        where: {
            isActive: true,
        },
    });

    return {
        toinAmount: result._sum.toinAmount?.toNumber() ?? 0,
        usdtAmount: result._sum.usdtAmount?.toNumber() ?? 0,
    };
}

private async getLevelIncome(): Promise<{
    toinAmount: number;
    usdtAmount: number;
}> {
    const result = await this.prisma.transaction.aggregate({
        _sum: {
            toinAmount: true,
            usdtAmount: true,
        },
        where: {
            trxType: TransactionType.LEVELING_BONUS, // Adjust based on your enum
            trxStatus: TransactionStatus.COMPLETED,
            levelId: { not: null },
        },
    });

    return {
        toinAmount: result._sum.toinAmount?.toNumber() ?? 0,
        usdtAmount: result._sum.usdtAmount?.toNumber() ?? 0,
    };
}

private async getRoiLevelIncome(): Promise<{
    toinAmount: number;
    usdtAmount: number;
}> {
    const result = await this.prisma.transaction.aggregate({
    _sum: {
        toinAmount: true,
        usdtAmount: true,
    },
    where: {
        trxType: TransactionType.STAKING_BONUS, // Adjust based on your enum
        trxStatus: TransactionStatus.COMPLETED,
    },
    });

    return {
        toinAmount: result._sum.toinAmount?.toNumber() ?? 0,
        usdtAmount: result._sum.usdtAmount?.toNumber() ?? 0,
    };
}

private async getTotalWithdrawalAmount(): Promise<{
    pending: number;
    approved: number;
    total: number;
}> {
    const [pendingResult, approvedResult] = await Promise.all([
    this.prisma.withdrawalRequest.aggregate({
        _sum: { amount: true },
        where: {
            status: WithdrawalStatus.PENDING,
            deletedAt: null,
        },
    }),
    this.prisma.withdrawalRequest.aggregate({
        _sum: { amount: true },
        where: {
            status: WithdrawalStatus.APPROVED,
            deletedAt: null,
        },
    }),
    ]);

    const pending = pendingResult._sum.amount?.toNumber() ?? 0;
    const approved = approvedResult._sum.amount?.toNumber() ?? 0;

    return {
        pending,
        approved,
        total: pending + approved,
    };
}


async getUserRegistrationGraphData(startDate?: Date,endDate?: Date): Promise<UserRegistrationGraphResponseDto> {

  const now = new Date();
  // Default: Current year start to current month end
  const normalizedStartDate = this.getStartOfMonth(startDate ?? new Date(now.getFullYear(), 0, 1));
  const normalizedEndDate = this.getEndOfMonth(endDate ?? now);

  const result = await this.prisma.user.groupBy({
        by: ['createdAt'],
        where: {
            createdAt: {
                gte: normalizedStartDate,
                lte: normalizedEndDate,
            },
            deletedAt: null,
        },
        _count: {
            id: true,
        },
    });

    // Then process the result to group by year/month
    const monthlyData = new Map<string, number>();

    result.forEach((item) => {
        const date = new Date(item.createdAt);
        const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
        monthlyData.set(key, (monthlyData.get(key) ?? 0) + item._count.id);
    });

    // Fill in all months (including zero counts)
    const data: MonthlyUserRegistrationDto[] = [];
    let totalUsers = 0;

    const currentDate = new Date(normalizedStartDate);
    while (currentDate <= normalizedEndDate) {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const count = monthlyData.get(`${year}-${month}`) ?? 0;
        totalUsers += count;

        data.push({
            year,
            month,
            monthName: this.monthNames[month - 1],
            count,
        });

        // Move to next month
        currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return {
        data,
        totalUsers,
    };
    }

    private getStartOfMonth(date: Date): Date {
        return new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
    }

    private getEndOfMonth(date: Date): Date {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
    }

}