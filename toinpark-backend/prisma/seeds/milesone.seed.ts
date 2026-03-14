import { PrismaClient } from '@prisma/client';

export async function seedMilestone(prisma: PrismaClient) {
    console.log('Seeding general settings...');

    await prisma.referralMilestone.createMany({
        data: [
    {
      id: '11111111-aaaa-bbbb-cccc-000000000001',
      referralName: 'Bronze',
      toinAmount: 100,
      targetPerson: 3,
      isActive: true,
      createdAt: new Date(),
      createdBy: 'system',
      updatedAt: new Date(),
      updatedBy: 'system',
      deletedAt: null,
      deletedBy: null,
      perUserMilestone: 1,
      sequenceNumber : 1,
      description: 'Bronze level referral milestone',
    },
    {
      id: '11111111-aaaa-bbbb-cccc-000000000002',
      referralName: 'Gold',
      toinAmount: 500,
      targetPerson: 5,
      isActive: true,
      createdAt: new Date(),
      createdBy: 'system',
      updatedAt: new Date(),
      updatedBy: 'system',
      deletedAt: null,
      deletedBy: null,
      perUserMilestone: 1,
      sequenceNumber : 2,
      description: 'Gold level referral milestone',
    },
    {
      id: '11111111-aaaa-bbbb-cccc-000000000003',
      referralName: 'Platinum',
      toinAmount: 1000,
      targetPerson: 10,
      isActive: true,
      createdAt: new Date(),
      createdBy: 'system',
      updatedAt: new Date(),
      updatedBy: 'system',
      deletedAt: null,
      deletedBy: null,
      perUserMilestone: 1,
      sequenceNumber : 3,
      description: 'Platinum level referral milestone',
    },
  ]
    });

    //console.log(`Seeded ${settings.length} general settings`);
}







