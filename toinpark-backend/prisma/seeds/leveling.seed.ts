import { PrismaClient, ReferralLevel } from '@prisma/client';

export async function seedLeveling(prisma: PrismaClient) {
    console.log('Seeding general settings...');

    

const referralLevels = [];

  for (let i = 1; i <= 15; i++) {
    referralLevels.push({
      levelName: `Level-${i}`,
      levelNumber: i,
      referralBonusPercentage:
        i === 1 ? 5 : i === 2 ? 2 : 1,
      isActive: true,
      createdAt: new Date(),
      createdBy: "system",
      updatedAt: null,
      updatedBy: null,
      deletedAt: null,
      deletedBy: null,
    });
  }

  await prisma.referralLevel.createMany({
    data: referralLevels,
    skipDuplicates: true,
  });

  console.log("Referral levels seeded successfully!");
}







