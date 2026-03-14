import { PrismaClient } from '@prisma/client';
import { cleanDatabase } from './seeds/utils/cleanup';
import { seedUsers } from './seeds/user.seed';
import { seedGeneralSettings } from './seeds/general_settings.seed';
import { seedSuccessOrError } from './seeds/success_or_error.seed';
import { seedStakingPackagePlan } from './seeds/staking_package_plan';
import { seedMilestone } from './seeds/milesone.seed';
import { seedLeveling } from './seeds/leveling.seed';
import { seedAirDropEvent } from './seeds/air_drop_event.seed';
import { countryAndStateSeed } from './seeds/country-state.seed';

import { Logger } from '@nestjs/common';

const logger = new Logger('Seed');


const prisma = new PrismaClient();

async function main() {

  logger.log('🌱 Starting seed...\n');

  const args = process.argv.slice(2);
  const shouldClean = !args.includes('--no-clean');
  const specific = args.find((arg) => arg.startsWith('--only='))?.split('=')[1];

  try {
    // Clean database if needed
    if (shouldClean) {
      await cleanDatabase(prisma);
    }

    // Run specific seed or all
    if (specific) {
      logger.log(`🎯 Running only: ${specific}\n`);
      
      switch (specific) {
        case 'users':
          await countryAndStateSeed(prisma);
          await seedUsers(prisma);
          await seedSuccessOrError(prisma);
          await seedStakingPackagePlan(prisma);
          await seedMilestone(prisma);
          await seedGeneralSettings(prisma);
          await seedLeveling(prisma);
          await seedAirDropEvent(prisma);

          break;
        // Add more cases as you add more models
        // case 'posts':
        //   await seedPosts(prisma);
        //   break;
        default:
          logger.log(`❌ Unknown seed target: ${specific}`);
          logger.log('Available targets: users');
      }
    } else {
      // Run all seeds
          await countryAndStateSeed(prisma);
          await seedUsers(prisma);
          await seedSuccessOrError(prisma);
          await seedStakingPackagePlan(prisma);
          await seedMilestone(prisma);
          await seedGeneralSettings(prisma);
          await seedLeveling(prisma);
          await seedAirDropEvent(prisma);
    }

    // Print summary
    logger.log('\n📊 Seeding Summary:');
    logger.log(`   - Users: ${await prisma.user.count()}`);

    logger.log('\n🎉 Seeding completed successfully!');
  } catch (error) {
    logger.error('❌ Error during seeding:', error.stack);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });