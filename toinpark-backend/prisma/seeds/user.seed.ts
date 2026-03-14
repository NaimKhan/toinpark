import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export async function seedUsers(prisma: PrismaClient) {

  console.log('Seeding database...');

  // Roles
  await prisma.roles.createMany({
    data: [
      { name: 'SuperAdmin', normalizedName: 'SUPER ADMIN' },
      { name: 'Admin', normalizedName: 'ADMIN' },
      { name: 'Member', normalizedName: 'MEMBER' },
    ],
    skipDuplicates: true,
  });

  // Password
  const passwordHash = await bcrypt.hash('Password@123', 10);

  // Super Admin User
  const superAdminUser = await prisma.user.upsert({
    where: { email: 'superadmin@toilabs.com' },
    update: {},
    create: {
      email: 'superadmin@toilabs.com',
      emailVerified: true,
      emailVerifiedAt: new Date(),
      username: 'TOIN10001',
      phoneNumber: '8801712345677',
      PasswordHashed: passwordHash,
      toinAccountNumber: 'TOIN00001',
      referralCode: 'ADMIN001',
      userRole: 'SuperAdmin',
      status: 'ACTIVE',
      createdBy: null,
      updatedBy: null,
    },
  });

  const getSuperAdminInfo = await prisma.user.findFirst({where: {email : "superadmin@toilabs.com"}})

  // Admin User
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@toilabs.com' },
    update: {},
    create: {
      email: 'admin@toilabs.com',
      emailVerified: true,
      emailVerifiedAt: new Date(),
      username: 'TOIN20002',
      phoneNumber: '8801712345678',
      PasswordHashed: passwordHash,
      toinAccountNumber: 'TOIN00002',
      referralCode: 'ADMIN002',
      userRole: 'Admin',
      status: 'ACTIVE',
      createdBy: getSuperAdminInfo.id,
      updatedBy: getSuperAdminInfo.id,
    },
  });

  // Member Users
  const memberUser: any[] = [];

  const firstMember = await prisma.user.upsert({
    where: { email: `member@toilabs.com` },
    update: {},
    create: {
      email: `member@toilabs.com`,
      emailVerified: true,
      emailVerifiedAt: new Date(),
      username: 'TOIN30003',
      phoneNumber: '8801712345679',
      PasswordHashed: passwordHash,
      toinAccountNumber: 'TOIN00003',
      referralCode: 'MEM101',
      userRole: 'Member',
      status: 'ACTIVE',
      createdBy: getSuperAdminInfo.id,
      updatedBy: getSuperAdminInfo.id,
    },
  });

  memberUser.push(firstMember);

  // Create 30 Member Accounts
  for (let index = 0; index < 30; index++) {
    const john = await prisma.user.upsert({
      where: { email: `john${index == 0 ? "" : index}@example.com` },
      update: {},
      create: {
        email: `john${index == 0 ? "" : index}@example.com`,
        emailVerified: true,
        emailVerifiedAt: new Date(),
        username: `TOIN400${index < 10 ? `0${index}` : index}`,
        phoneNumber: `88017123456${index < 10 ? `0${index}` : index}`,
        phoneVerified: true,
        phoneVerifiedAt: new Date(),
        PasswordHashed: passwordHash,
        toinAccountNumber: `TOIN400${index < 10 ? `0${index}` : index}`,
        referralCode: `MEM0${index < 10 ? `0${index}` : index}`,
        userRole: 'Member',
        status: 'ACTIVE',
        createdBy: getSuperAdminInfo.id,
        updatedBy: getSuperAdminInfo.id,
      },
    });

    memberUser.push(john); // FIXED
  }


  //Set Referral In after create user

  var getJohnData = await prisma.user.findFirst({ where: { email: "john@example.com" } });
  const emailSet1 = ["john1@example.com", "john2@example.com", "john3@example.com", "john4@example.com"];

  await prisma.user.updateMany({
    where: {
      email: { in: emailSet1 }
    },
    data: {
      referrerId: getJohnData.id,
      createdBy: getJohnData.id,
      updatedBy: getJohnData.id,
    }
  });

  var getJohn1Data = await prisma.user.findFirst({ where: { email: "john1@example.com" } });
  const emailSet2 = ["john5@example.com", "john6@example.com", "john7@example.com", "john8@example.com", "john9@example.com", "john10@example.com", "john11@example.com", "john12@example.com", "john13@example.com", "john14@example.com", "john15@example.com"];

  await prisma.user.updateMany({
    where: {
      email: { in: emailSet2 }
    },
    data: {
      referrerId: getJohn1Data.id,
      createdBy: getJohn1Data.id,
      updatedBy: getJohn1Data.id,
    }
  });

  var getJohn3Data = await prisma.user.findFirst({ where: { email: "john3@example.com" } });
  await prisma.user.update({
    where: { email: "john16@example.com" },
    data: { referrerId: getJohn3Data.id }
  });

  var getJohn16Data = await prisma.user.findFirst({ where: { email: "john16@example.com" } });
  await prisma.user.update({
    where: { email: "john17@example.com" },
    data: { referrerId: getJohn16Data.id }
  });

  var getJohn17Data = await prisma.user.findFirst({ where: { email: "john17@example.com" } });
  await prisma.user.update({
    where: { email: "john18@example.com" },
    data: { referrerId: getJohn17Data.id }
  });

  var getJohn18Data = await prisma.user.findFirst({ where: { email: "john18@example.com" } });
  await prisma.user.update({
    where: { email: "john19@example.com" },
    data: { referrerId: getJohn18Data.id }
  });

  var getJohn19Data = await prisma.user.findFirst({ where: { email: "john19@example.com" } });
  await prisma.user.update({
    where: { email: "john20@example.com" },
    data: { referrerId: getJohn19Data.id }
  });

  var getJohn20Data = await prisma.user.findFirst({ where: { email: "john20@example.com" } });
  await prisma.user.update({
    where: { email: "john21@example.com" },
    data: { referrerId: getJohn20Data.id }
  });

  // Wallet Creation for All Users (fixed)
  const users = [superAdminUser, adminUser, ...memberUser];

  let profileIndex = 0;
  for (const u of users) {
    // Profile creation
    await prisma.userProfile.upsert({
      where: { userId: u.id },
      update: {},
      create: {
        userId: u.id,
        firstName: u.userRole == 'Admin' ? 'System' : u.userRole == 'SuperAdmin' ? 'Super' : u.userRole == 'Member' && u.email == `member@toilabs.com` ? 'Member' : `john${profileIndex == 0 ? "" : profileIndex}`,
        lastName: 'User',
        gender: 'Male',
        addressLine1: 'Head Office',
        city: 'Dhaka',
        zipCode: '1000',
      },
    });
    profileIndex = u.userRole == 'Admin' ? 0 : u.userRole == 'SuperAdmin' ? 0 : u.userRole == 'Member'  && u.email == `member@toilabs.com`  ? 0 : profileIndex + 1;
  }


  for (const u of users) {
    await prisma.userWallet.upsert({
      where: { userId: u.id },
      update: {},
      create: {
        userId: u.id,
        walletBalance: 5,
        totalWithdrawals: 0,
        totalEntryBonus: 5,
      },
    });
  }

  // Role Mapping
  const roleMap = {
    SuperAdmin: await prisma.roles.findFirst({ where: { name: 'SuperAdmin' } }),
    Admin: await prisma.roles.findFirst({ where: { name: 'Admin' } }),
    Member: await prisma.roles.findFirst({ where: { name: 'Member' } }),
  };

  // Assign Roles
  if (roleMap.SuperAdmin) {
    await prisma.userRoles.upsert({
      where: { userId_roleId: { userId: superAdminUser.id, roleId: roleMap.SuperAdmin.id } },
      update: {},
      create: { userId: superAdminUser.id, roleId: roleMap.SuperAdmin.id },
    });
  }

  if (roleMap.Admin) {
    await prisma.userRoles.upsert({
      where: { userId_roleId: { userId: adminUser.id, roleId: roleMap.Admin.id } },
      update: {},
      create: { userId: adminUser.id, roleId: roleMap.Admin.id },
    });
  }

  if (roleMap.Member) {
    for (const u of memberUser) {
      await prisma.userRoles.upsert({
        where: { userId_roleId: { userId: u.id, roleId: roleMap.Member.id } },
        update: {},
        create: { userId: u.id, roleId: roleMap.Member.id },
      });
    }
  }

  //Transaction Seed

  // const result = await prisma.$queryRawUnsafe(
  //   `INSERT INTO public.transactions(
	//  id, transaction_auto_id, user_id, stake_id, toin_amount, usd_amount, 
	//  usd_conversion_rate, trx_success_datetime, trx_payment_gateway, is_active, 
	//  created_at, created_by, updated_at, updated_by, deleted_at, deleted_by, 
	//  trx_initiate_datetime, trx_type, trx_note, trx_status, trx_payment_gateway_reference_id, 
	//  trx_reference_id, trx_message, trx_payment_gateway_response, is_leveling_bonus_calculated, 
	//  level_name, referred_user)
	
	// SELECT 
	// 	gen_random_uuid(),
	// 	'TXN-' || EXTRACT(EPOCH FROM NOW()) * 1000 || '-' || floor(random() * 9000 + 1000)::int AS txn_id, 
	// 	id, null, 5, 0.05, 0.01, NOW(), null, true, '2025-11-26 09:05:02.346', 'system', null, null, null, 
	// 	null, Now(), 'ENTRY_BONUS', 'Create a new COMPLETED transaction. /n /n', 'COMPLETED', null, null, 
	// 	null, null, false, null, null  
	// FROM public.users where email not in ('superadmin@toilabs.com', 'admin@toilabs.com')`
  // );

  console.log('✅ Database seeding completed!');
}
