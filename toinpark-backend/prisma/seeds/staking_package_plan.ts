import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export async function seedStakingPackagePlan(prisma: PrismaClient) {

    console.log('Seeding database...');

    await prisma.stakingPackagePlan.createMany({
        data: [
            {
                name: 'Starter Plan',
                description: 'This plan gives 2.5% daily profit',
                dailyProfitPercent: 0.15,
                bonusAmount: 0,
                isActive: true,
                createdAt: new Date('2025-01-01T10:00:00.000Z'),
                createdBy: 'system',
                updatedAt: new Date('2025-01-05T12:00:00.000Z'),
                updatedBy: 'admin',
                deletedAt: null,
                deletedBy: null,
                maxToinAmount: 3000,
                minToinAmount: 0,
                minimumDurationInDays: 7,
                recurringProfitDays: 3,
                totalToinPurchasedWithUSD: 0.01,
            },
            {
                name: 'Silver Plan',
                description: 'This plan gives 3% daily profit',
                dailyProfitPercent: 0.15,
                bonusAmount: 10,
                isActive: true,
                createdAt: new Date('2025-01-01T10:00:00.000Z'),
                createdBy: 'system',
                updatedAt: new Date('2025-01-05T12:00:00.000Z'),
                updatedBy: 'admin',
                deletedAt: null,
                deletedBy: null,
                maxToinAmount: 6000,
                minToinAmount: 3001,
                minimumDurationInDays: 7,
                recurringProfitDays: 3,
                totalToinPurchasedWithUSD: 0.01,
            },
            {
                name: 'Gold Plan',
                description: 'This plan gives 4% daily profit',
                dailyProfitPercent: 4,
                bonusAmount: 20,
                isActive: true,
                createdAt: new Date('2025-01-01T10:00:00.000Z'),
                createdBy: 'system',
                updatedAt: new Date('2025-01-05T12:00:00.000Z'),
                updatedBy: 'admin',
                deletedAt: null,
                deletedBy: null,
                maxToinAmount: 12000,
                minToinAmount: 6001,
                minimumDurationInDays: 7,
                recurringProfitDays: 2,
                totalToinPurchasedWithUSD: 0.01,
            },
            {
                name: 'Platinum Plan',
                description: 'This plan gives 5% daily profit',
                dailyProfitPercent: 5,
                bonusAmount: 30,
                isActive: true,
                createdAt: new Date('2025-01-01T10:00:00.000Z'),
                createdBy: 'system',
                updatedAt: new Date('2025-01-05T12:00:00.000Z'),
                updatedBy: 'admin',
                deletedAt: null,
                deletedBy: null,
                maxToinAmount: 15000,
                minToinAmount: 12001,
                minimumDurationInDays: 7,
                recurringProfitDays: 2,
                totalToinPurchasedWithUSD: 0,
            },
        ]
    });

    console.log("Message Seed Completed!");
}




