import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { TransactionType, UserStatus } from '@prisma/client';
import { MemberResponseDto } from './dto/member-response.dto';
import { UpdateMemberStatusDto } from './dto/update-member-status.dto';
import { UpdateMemberProfileDto } from './dto/update-member-profile.dto';
import { ParentMemberInfoDto } from './dto/direct-member-paginated-response.dto';
import { plainToInstance } from 'class-transformer';
import { ValidationException } from 'src/common/exceptions';
import { MemberSortField } from './dto/member-sort-field.enum';
import { hashPassword } from 'src/common/utils/hash.util';
import { AmountTypeEnum } from 'src/common/enums/amount-type-enum';
import { TransactionCalculationService } from '../transaction/transaction-calculation.service';

const TRANSACTION_TYPE_AMOUNT_MAP = new Map<TransactionType, AmountTypeEnum>([
  // Credit transactions
  [TransactionType.STAKE, AmountTypeEnum.CREDIT],
  [TransactionType.COMMISSION_BONUS, AmountTypeEnum.CREDIT],
  [TransactionType.PROFIT, AmountTypeEnum.CREDIT],
  [TransactionType.STAKING_BONUS, AmountTypeEnum.CREDIT],
  [TransactionType.ENTRY_BONUS, AmountTypeEnum.CREDIT],
  [TransactionType.KYC_BONUS, AmountTypeEnum.CREDIT],
  [TransactionType.CHALLENGE_BONUS, AmountTypeEnum.CREDIT],
  [TransactionType.LEVELING_BONUS, AmountTypeEnum.CREDIT],
  [TransactionType.SOCIAL_REFERRAL, AmountTypeEnum.CREDIT],
  [TransactionType.CLAIM_BONUS, AmountTypeEnum.CREDIT],

  // Debit transactions
  [TransactionType.REFUND, AmountTypeEnum.DEBIT],
  [TransactionType.WITHDRAWAL, AmountTypeEnum.DEBIT],
  [TransactionType.VOID, AmountTypeEnum.DEBIT],
]);


@Injectable()
export class MemberService {
  constructor(private readonly prisma: PrismaService, 
              private readonly configService: ConfigService,
              private readonly transactionCalculationService: TransactionCalculationService) { }

  async findAllMembers(
    filters: any,
    page = 1,
    limit = 10,
    sortBy?: MemberSortField,
    sortOrder: 'asc' | 'desc' = 'desc',
  ): Promise<{ items: MemberResponseDto[]; totalCount: number }> {
    const skip = (page - 1) * limit;

    // Build date range filter
    const dateFilter: any = {};
    if (filters.joinedFrom || filters.joinedTo) {
      dateFilter.createdAt = {};

      if (filters.joinedFrom) {
        // Start of the day
        const fromDate = new Date(filters.joinedFrom);
        fromDate.setHours(0, 0, 0, 0);
        dateFilter.createdAt.gte = fromDate;
      }

      if (filters.joinedTo) {
        // End of the day
        const toDate = new Date(filters.joinedTo);
        toDate.setHours(23, 59, 59, 999);
        dateFilter.createdAt.lte = toDate;
      }
    }


    const where: any = {
      deletedAt: null,
      userRole: 'Member', // Only get members
      ...dateFilter,
      ...(filters.search && {
        OR: [
          { username: { contains: filters.search, mode: 'insensitive' } },
          { email: { contains: filters.search, mode: 'insensitive' } },
          { phoneNumber: { contains: filters.search, mode: 'insensitive' } },
          { toinAccountNumber: { contains: filters.search, mode: 'insensitive' } },
        ],
      }),
      ...(filters.status && { status: filters.status }),
      ...(filters.emailVerified !== undefined && { emailVerified: filters.emailVerified }),
      ...(filters.phoneVerified !== undefined && { phoneVerified: filters.phoneVerified }),
      ...(filters.isDirectMember !== undefined && { referrerId: null }),
      ...(filters.isDownLineMember !== undefined && { referrerId: { not: null } }),
    };


    let orderBy: any = { createdAt: MemberSortField.CREATED_AT }; // Default sorting

    if (sortBy) {
      orderBy = { [sortBy]: sortOrder };
    }

    const [items, totalCount] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          userProfile: true,
          userWallet: true,
          userTransaction: true,
          referrals: {
            select: {
              id: true,
            },
          },
          createdWithdrawalRequests: {
            where: {
              status: 'APPROVED',
              deletedAt: null,
            },
          },
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    
    // Get direct member IDs for each user
    const directMemberIds = items.flatMap((item) => item.referrals.map((r) => r.id));

    // Get indirect member counts (users referred by direct members)
    const indirectMemberCounts = await this.prisma.user.groupBy({
      by: ['referrerId'],
      where: {
        referrerId: { in: directMemberIds },
        deletedAt: null,
      },
      _count: {
        id: true,
      },
    });

    // Create a map of direct member ID -> their referral count
    const directMemberReferralMap = new Map(
      indirectMemberCounts.map((item) => [item.referrerId, item._count.id]),
    );

    // Calculate indirect count for each user
    const userIndirectCountMap = new Map<string, number>();
    items.forEach((item) => {
      const indirectCount = item.referrals.reduce((sum, directMember) => {
        return sum + (directMemberReferralMap.get(directMember.id) || 0);
      }, 0);
      userIndirectCountMap.set(item.id, indirectCount);
    });

    // Get unique referrerIds for sponsor info
    const referrerIds = [...new Set(
      items.filter((item) => item.referrerId).map((item) => item.referrerId),
    )];

    // Fetch referrer usernames with profiles
    let referrerMap = new Map<string, { displayName: string; toinAccountNumber: string }>();
    if (referrerIds.length > 0) {
      const referrers = await this.prisma.user.findMany({
        where: {
          id: { in: referrerIds },
        },
        select: {
          id: true,
          username: true,
          toinAccountNumber: true,
          userProfile: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      });

      referrerMap = new Map(
        referrers.map((ref) => {
          const firstName = ref.userProfile?.firstName?.trim();
          const lastName = ref.userProfile?.lastName?.trim();

          let displayName: string;
          if (firstName && lastName) {
            displayName = `${firstName} ${lastName}`;
          } else if (firstName) {
            displayName = firstName;
          } else if (lastName) {
            displayName = lastName;
          } else {
            displayName = ref.username;
          }

          return [
            ref.id,
            {
              displayName,
              toinAccountNumber: ref.toinAccountNumber,
            },
          ];
        }),
      );
    }

    // Transform data to include computed fields
    const transformedItems = items.map((item) => {
      const sponsorInfo = item.referrerId ? referrerMap.get(item.referrerId) : null;

      const transactions = this.transactionCalculationService.addAmountType(item.userTransaction ?? []);
      const transactionSummary = this.transactionCalculationService.calculateTotals(transactions);

      const directMemberCount = item.referrals?.length || 0;
      const indirectMemberCount = userIndirectCountMap.get(item.id) || 0;

      // Calculate total platform fee from withdrawal requests
      const totalPlatformFeeUsdt = (item.createdWithdrawalRequests ?? []).reduce(
        (sum, wr) => sum + (Number(wr.platformFee) || 0),
        0,
      );

      return {
        ...item,
        totalToinCredit: transactionSummary.totalToinCredit,
        totalToinDebit: transactionSummary.totalToinDebit,
        totalUsdtCredit: transactionSummary.totalUsdtCredit,
        totalUsdtDebit: transactionSummary.totalUsdtDebit,
        totalPlatformFeeUsdt,
        sponsorName: sponsorInfo?.displayName || 'N/A',
        sponsorToinAccountNumber: sponsorInfo?.toinAccountNumber || 'N/A',
        activationDate: item.emailVerifiedAt || item.phoneVerifiedAt,
        directMemberCount,
        indirectMemberCount,
      };
    });


    return {
      items: plainToInstance(MemberResponseDto, transformedItems, {
        excludeExtraneousValues: true,
      }),
      totalCount,
    };
  }



  async findOneMember(id: string): Promise<MemberResponseDto> {
    const member = await this.prisma.user.findFirst({
      where: {
        id: id,
        deletedAt: null,
        userRole: 'Member',
      },
      include: {
        userProfile: true,
        userTransaction: true,
      },
    });

    if (!member) {
      throw new NotFoundException(`Member with DI ${id} not found`);
    }

    const transformedUserTransactions = member.userTransaction.map(item => {
      const amountType = TRANSACTION_TYPE_AMOUNT_MAP.get(item.trxType) || AmountTypeEnum.DEBIT;

      return {
        ...item,
        amountType
      };

    });

    member.userTransaction = transformedUserTransactions;

    const directMembers = await this.prisma.user.findMany({
      where: {
        referrerId: id,
        deletedAt: null,
        userRole: 'Member',
      },
      include: {
        userProfile: true
      },
    });

    member['directMembers'] = directMembers;

    return plainToInstance(MemberResponseDto, member, {
      excludeExtraneousValues: true,
    });
  }

  async updateMemberStatus(
    id: string,
    dto: UpdateMemberStatusDto,
    updatedBy: string,
  ): Promise<MemberResponseDto> {
    // Check if member exists
    await this.findOneMember(id);

    const member = await this.prisma.user.update({
      where: { id: id },
      data: {
        status: dto.status,
        updatedBy: updatedBy,
        updatedAt: new Date(),
      },
      include: {
        userProfile: true,
      },
    });

    return plainToInstance(MemberResponseDto, member, {
      excludeExtraneousValues: true,
    });
  }

  async updateMemberProfile(id: string, dto: UpdateMemberProfileDto, updatedBy: string): Promise<MemberResponseDto> {
    // Check if member exists
    const member = await this.findOneMember(id);

    // Check if email is being changed and if it's already taken
    if (dto.email && dto.email !== member.email) {
      // Check change limit
      const maxEmailChanges = this.configService.get<number>('MAX_EMAIL_CHANGE_COUNT') || 3;
      if ((member.emailChangingCount || 0) >= maxEmailChanges) {
        throw new ValidationException({
          email: ['Email change limit exceeded.'],
        });
      }

      const existingEmail = await this.prisma.user.findFirst({
        where: {
          email: dto.email,
          id: { not: id },
          deletedAt: null,
        },
      });
      if (existingEmail) {
        throw new ValidationException({
          email: ['Email is already taken'],
        });
      }
      member.emailVerified = true;
      member.emailChangingCount = (member.emailChangingCount || 0) + 1;
      member.emailVerifiedAt = new Date();
      //create email verification log
      await this.prisma.userChangeHistoryForEmailOrPhone.create({
        data: {
          userId: id,
          userName: member.username,
          fullName: member.userProfile?.firstName + ' ' + member.userProfile?.lastName,
          oldValue: member.email,
          newValue: dto.email,
          createdAt: new Date(),
          createdBy: updatedBy,
        },
      });
    }

    // Check if phone number is being changed and if it's already taken
    if (dto.phoneNumber && dto.phoneNumber !== member.phoneNumber) {
      // Check change limit
      const maxPhoneChanges = this.configService.get<number>('MAX_PHONE_CHANGE_COUNT') || 3;
      if ((member.phoneChangingCount || 0) >= maxPhoneChanges) {
        throw new ValidationException({
          phoneNumber: ['Phone number change limit exceeded.'],
        });
      }

      const existingPhone = await this.prisma.user.findFirst({
        where: {
          phoneNumber: dto.phoneNumber,
          id: { not: id },
          deletedAt: null,
        },
      });
      if (existingPhone) {
        throw new ValidationException({
          phoneNumber: ['Phone number is already taken'],
        });
      }
      member.phoneVerified = true;
      member.phoneChangingCount = (member.phoneChangingCount || 0) + 1;
      member.phoneVerifiedAt = new Date();
      //create phone verification log
      await this.prisma.userChangeHistoryForEmailOrPhone.create({
        data: {
          userId: id,
          userName: member.username,
          fullName: member.userProfile?.firstName + ' ' + member.userProfile?.lastName,
          oldValue: member.phoneNumber,
          newValue: dto.phoneNumber,
          createdAt: new Date(),
          createdBy: updatedBy,
        },
      });
    }


    // Update user basic info
    const userUpdateData: any = {
      updatedBy: updatedBy,
      updatedAt: new Date(),
      email: dto.email,
      phoneNumber: dto.phoneNumber ?? null,
      emailVerifiedAt: member.emailVerifiedAt,
      phoneVerifiedAt: member.phoneVerifiedAt,
      emailVerified: member.emailVerified,
      phoneVerified: member.phoneVerified,
      emailChangingCount: member.emailChangingCount,
      phoneChangingCount: member.phoneChangingCount,
    };

    if (dto.password) {
      userUpdateData.PasswordHashed = await hashPassword(dto.password);
    }

    // Update user profile
    const profileUpdateData: any = {
      updatedBy: updatedBy,
      updatedAt: new Date(),
      firstName: dto.firstName ?? null,
      lastName: dto.lastName ?? null,
      dateOfBirth: dto.dateOfBirth ?? null,
      gender: dto.gender ?? null,
      bio: dto.bio ?? null,
      addressLine1: dto.addressLine1 ?? null,
      addressLine2: dto.addressLine2 ?? null,
      city: dto.city ?? null,
      stateId: dto.stateId || null,
      countryId: dto.countryId || null,
      zipCode: dto.zipCode ?? null,
    };

    // Perform updates in transaction
    const updatedMember = await this.prisma.$transaction(async (prisma) => {
      // Update user
      await prisma.user.update({
        where: { id: id },
        data: userUpdateData,
      });



      // Update or create profile
      if (member.userProfile) {
        await prisma.userProfile.update({
          where: { userId: id },
          data: profileUpdateData,
        });
      } else {
        await prisma.userProfile.create({
          data: {
            ...profileUpdateData,
            userId: id,
            createdBy: updatedBy,
          },
        });
      }

      // Fetch updated member with profile
      return await prisma.user.findUnique({
        where: { id: id },
        include: {
          userProfile: true,
        },
      });
    });

    return plainToInstance(MemberResponseDto, updatedMember, {
      excludeExtraneousValues: true,
    });
  }

  async deleteMember(id: string, deletedBy: string): Promise<MemberResponseDto> {
    // Check if member exists
    await this.findOneMember(id);

    // Check if member has any active stakes
    const activeStakes = await this.prisma.userStakingPackage.count({
      where: {
        userId: id,
        // Add any conditions for active stakes if needed
      },
    });

    if (activeStakes > 0) {
      throw new BadRequestException(
        `Cannot delete member with ${activeStakes} active stake(s)`,
      );
    }

    const member = await this.prisma.user.update({
      where: { id: id },
      data: {
        deletedAt: new Date(),
        deletedBy: deletedBy,
        status: UserStatus.INACTIVE,
      },
      include: {
        userProfile: true,
      },
    });

    return plainToInstance(MemberResponseDto, member, {
      excludeExtraneousValues: true,
    });
  }

  async verifyMemberKyc(
    id: string,
    updatedBy: string,
  ): Promise<MemberResponseDto> {
    // Check if member exists
    const member = await this.findOneMember(id);

    if (member.isKycVerified) {
      throw new BadRequestException('Member is already KYC verified');
    }

    const updatedMember = await this.prisma.user.update({
      where: { id: id },
      data: {
        isKycVerified: true,
        kycVerifiedAt: new Date(),
        updatedBy: updatedBy,
        updatedAt: new Date(),
      },
      include: {
        userProfile: true,
      },
    });

    return plainToInstance(MemberResponseDto, updatedMember, {
      excludeExtraneousValues: true,
    });
  }

  async revokeKycVerification(
    id: string,
    updatedBy: string,
  ): Promise<MemberResponseDto> {
    // Check if member exists
    await this.findOneMember(id);

    const updatedMember = await this.prisma.user.update({
      where: { id: id },
      data: {
        isKycVerified: false,
        kycVerifiedAt: null,
        updatedBy: updatedBy,
        updatedAt: new Date(),
      },
      include: {
        userProfile: true,
      },
    });

    return plainToInstance(MemberResponseDto, updatedMember, {
      excludeExtraneousValues: true,
    });
  }

  async findLevelOneReferralsOfDirectUser(
    id: string,
    page = 1,
    limit = 10,
    sortBy: MemberSortField = MemberSortField.CREATED_AT,
    sortOrder: 'asc' | 'desc' = 'desc',
  ): Promise<{ items: MemberResponseDto[]; totalCount: number, memberInfo: ParentMemberInfoDto }> {
    const skip = (page - 1) * limit;

    const parentMember = await this.prisma.user.findFirst({
      where: {
        id: id,
        deletedAt: null,
        userRole: 'Member',
      },
      include: {
        userProfile: true,
      },
    });

    if (!parentMember) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }

    const memberInfo = {
      id: parentMember.id,
      fullName: `${parentMember.userProfile?.firstName ?? ''} ${parentMember.userProfile?.lastName ?? ''}`.trim(),
      toinAccountNumber: parentMember.toinAccountNumber,
    };

    const where = {
      referrerId: id,
      deletedAt: null,
      userRole: 'Member',
    };

    const [items, totalCount] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          userProfile: true,
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      items: plainToInstance(MemberResponseDto, items, {
        excludeExtraneousValues: true,
      }),
      totalCount,
      memberInfo,
    };
  }
}
