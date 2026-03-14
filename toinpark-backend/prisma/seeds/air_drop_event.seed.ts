import { PrismaClient } from '@prisma/client';

export async function seedAirDropEvent(prisma: PrismaClient) {
    console.log('Seeding general settings...');

    await prisma.airDropEvent.createMany({
        data: [
            {
                id: '00000000-0000-0000-0000-000000000001',
                eventName: 'Air Drop Event 1',
                totalAmount: 100000000.00,
                eventStartDate: new Date('2024-01-01T00:00:00Z'),
                eventEndDate: new Date('2024-12-31T23:59:59Z'),
                usdConversionRate: 0.010000,
                usedAmount: 0.00,
                isActive: true,
                createdAt: new Date(),
                createdBy: 'system',
                updatedAt: new Date(),
                updatedBy: 'system',
                deletedAt: null,
                deletedBy: null,
            }
        ]

    });

    //console.log(`Seeded ${settings.length} general settings`);
}
