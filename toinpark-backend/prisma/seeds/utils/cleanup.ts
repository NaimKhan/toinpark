import { PrismaClient } from '@prisma/client';

export async function cleanDatabase(prisma: PrismaClient) {
  console.log('🧹 Cleaning database...');
  
  // // Delete in order of dependencies (child to parent)
  // //await prisma.profile.deleteMany();
  // await prisma.user.deleteMany();

   // Delete child tables first
  await prisma.userWallet.deleteMany();   // <-- depends on user
  await prisma.userProfile.deleteMany();   // <-- depends on user
  await prisma.userRoles.deleteMany();   // <-- depends on user
  // await prisma.profile.deleteMany().catch(() => {}); // if you have profile table
  // await prisma.role.deleteMany().catch(() => {}); // if roles exist

  // Now delete users safely
  await prisma.user.deleteMany();
  
  console.log('✅ Database cleaned');
}