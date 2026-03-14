import { PrismaClient } from '@prisma/client';

export async function seedGeneralSettings(prisma: PrismaClient) {
  console.log('Seeding general settings...');

  await prisma.systemSetting.createMany({
    data: [
      {
        key: 'toinConventionRate',
        value: '0.01',
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        key: 'entryBonusToin',
        value: '5.00',
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        key: 'kycBonusToin',
        value: '10.00',
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        key: 'socialBonusToin',
        value: '10.00',
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        key: 'favicon',
        value: 'favicon.ico',
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        key: 'logo',
        value: 'logo.ico',
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        key: 'whatsApp',
        value: '+8801756307427',
        order: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        key: 'organizationName',
        value: 'TOIN Park',
        order: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        key: 'organizationEmail',
        value: 'info@toilabs.com',
        order: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        key: 'telegram',
        value: '+8801756307427',
        order: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        key: 'siteTitle',
        value: 'ToinPark',
        order: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        key: 'airdropEventMessage',
        value: 'Join our airdrop event to win exciting prizes!',
        order: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        key: 'minUSDTWithdrawalAmount',
        value: '10',
        order: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        key: 'platformWithdrawalFeePercentage',
        value: '1',
        order: 11,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  });
}
