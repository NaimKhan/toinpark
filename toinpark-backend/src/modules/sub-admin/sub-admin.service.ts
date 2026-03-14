import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminResponseDto } from './dto/admin-response.dto';
import { plainToInstance } from 'class-transformer';
import { ValidationException } from 'src/common/exceptions';
import * as bcrypt from 'bcrypt';
import { UpdateMemberStatusDto } from '../member/dto/update-member-status.dto';
import { UserRole } from 'src/common/enums/user-role.enum';
import { UpdateAdminDto } from './dto/update-admin.dto';

import { UserStatus } from '@prisma/client';

@Injectable()
export class SubAdminService {
  constructor(private readonly prisma: PrismaService) {}


    /**
   * Generate unique TOIN account number
   */
  private async generateToinAccountNumber(): Promise<string> {
    let accountNumber: string;
    let exists = true;

    while (exists) {
      // Generate 17-digit number
      const randomNum = Math.floor(10000000000000000 + Math.random() * 90000000000000000);
      accountNumber = randomNum.toString();
      
      const user = await this.prisma.user.findUnique({
        where: { toinAccountNumber: accountNumber },
      });
      
      exists = !!user;
    }

    return accountNumber;
  }

  /**
   * Generate unique referral code
   */
  private async generateReferralCode(): Promise<string> {
    let referralCode: string;
    let exists = true;

    while (exists) {
      // Generate 8-character alphanumeric code
      referralCode = Math.random().toString(36).substring(2, 10).toUpperCase();
      
      const user = await this.prisma.user.findUnique({
        where: { referralCode },
      });
      
      exists = !!user;
    }

    return referralCode;
  }


  /**
   * Create a new admin user
   */
  async create(
    dto: CreateAdminDto,
    createdBy: string,
  ): Promise<AdminResponseDto> {
    // Check if email already exists
    if (dto.email) {
      const existingEmail = await this.prisma.user.findFirst({
        where: {
          email: dto.email,
          deletedAt: null,
        },
      });

      if (existingEmail) {
        throw new ValidationException({
          email: ['Email is already registered'],
        });
      }
    }

    // Check if phone number already exists
    if (dto.userName) {
      const existingPhone = await this.prisma.user.findFirst({
        where: {
          username: dto.userName,
          deletedAt: null,
        },
      });

      if (existingPhone) {
        throw new ValidationException({
          userName: ['Username is already registered'],
        });
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Generate unique identifiers
    const toinAccountNumber = await this.generateToinAccountNumber();
    const referralCode = await this.generateReferralCode();

    // Determine user role
    const userRole = UserRole.ADMIN;

    //  Find admin role
    const adminRole = await this.prisma.roles.findFirst({
        where: { name: UserRole.ADMIN.toString() },
    });

    // Create admin user with profile in transaction
    const admin = await this.prisma.user.create({
        data: {
            email: dto.email,
            username: dto.userName,
            PasswordHashed: hashedPassword,
            userRole: UserRole.ADMIN, // Just set the string value
            status: UserStatus.ACTIVE,
            toinAccountNumber: toinAccountNumber,
            referralCode: referralCode,
            emailVerified: true,
            emailVerifiedAt: new Date(),
            createdBy: createdBy,
        },
    });

    await this.prisma.userRoles.create({
        data: {
            userId: admin.id,
            roleId: adminRole.id,
        },
    });


    // Create UserProfile if firstName or lastName is provided
    if (dto.firstName || dto.lastName) {
      await this.prisma.userProfile.create({
        data: {
          userId: admin.id,
          firstName: dto.firstName,
          lastName: dto.lastName,
          createdBy: createdBy,
        },
      });
    }

    // Fetch the complete admin with profile
    const adminWithProfile = await this.prisma.user.findUnique({
      where: { id: admin.id },
      include: {
        userProfile: true,
      },
    });

    
    return plainToInstance(AdminResponseDto, adminWithProfile, {
      excludeExtraneousValues: true,
    });
  }

  /**
   * Get all admin users
   */
  async findAll(
    filters: any,
    page = 1,
    limit = 10,
  ): Promise<{ items: AdminResponseDto[]; totalCount: number }> {
    const skip = (page - 1) * limit;

    // Build date range filter
    const dateFilter: any = {};
    if (filters.createdFrom || filters.createdTo) {
      dateFilter.createdAt = {};
      
      if (filters.createdFrom) {
        const fromDate = new Date(filters.createdFrom);
        fromDate.setHours(0, 0, 0, 0);
        dateFilter.createdAt.gte = fromDate;
      }
      
      if (filters.createdTo) {
        const toDate = new Date(filters.createdTo);
        toDate.setHours(23, 59, 59, 999);
        dateFilter.createdAt.lte = toDate;
      }
    }

    const search = filters.search?.trim();

    const nameParts = search?.split(' ').filter(Boolean) || [];
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');

    const where: any = {
      deletedAt: null,
      userRole: { in: ['Admin', 'SuperAdmin'] },
      ...dateFilter,

      ...(search && {
        OR: [
          // 🔹 User table search
          { username: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { phoneNumber: { contains: search, mode: 'insensitive' } },

          // 🔹 User profile: first OR last name
          {
            userProfile: {
              OR: [
                { firstName: { contains: search, mode: 'insensitive' } },
                { lastName: { contains: search, mode: 'insensitive' } },
              ],
            },
          },

          // 🔹 Full name search (first + last)
          ...(nameParts.length > 1
            ? [
                {
                  userProfile: {
                    AND: [
                      { firstName: { contains: firstName, mode: 'insensitive' } },
                      { lastName: { contains: lastName, mode: 'insensitive' } },
                    ],
                  },
                },
              ]
            : []),
        ],
      }),
      ...(filters.status && { status: filters.status }),
      ...(filters.userRole && { userRole: filters.userRole }),
    };

    const [items, totalCount] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          userProfile: true,
          userRoles: true
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      items: plainToInstance(AdminResponseDto, items, {
        excludeExtraneousValues: true,
      }),
      totalCount,
    };
  }

  /**
   * Get admin user by ID
   */
  async findOne(id: string): Promise<AdminResponseDto> {
    const admin = await this.prisma.user.findFirst({
      where: {
        id: id,
        deletedAt: null,
        userRole: { in: ['Admin', 'SuperAdmin'] },
      },
      include: {
        userProfile: true,
        userRoles: true
      },
    });

    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }

    return plainToInstance(AdminResponseDto, admin, {
      excludeExtraneousValues: true,
    });
  }


  /**
   * Update admin user
   */
  async update(
    id: string,
    dto: UpdateAdminDto,
    updatedBy: string,
  ): Promise<AdminResponseDto> {
    // Check if admin exists
    const existingAdmin = await this.prisma.user.findFirst({
      where: {
        id,
        userRole: UserRole.ADMIN,
        deletedAt: null,
      },
    });

    if (!existingAdmin) {
      throw new NotFoundException('Admin not found');
    }

    // Check if email already exists (excluding current admin)
    if (dto.email && dto.email !== existingAdmin.email) {
      const existingEmail = await this.prisma.user.findFirst({
        where: {
          email: dto.email,
          deletedAt: null,
          id: { not: id },
        },
      });

      if (existingEmail) {
        throw new ValidationException({
          email: ['Email is already registered'],
        });
      }
    }

    // Check if username already exists (excluding current admin)
    if (dto.userName && dto.userName !== existingAdmin.username) {
      const existingUsername = await this.prisma.user.findFirst({
        where: {
          username: dto.userName,
          deletedAt: null,
          id: { not: id },
        },
      });

      if (existingUsername) {
        throw new ValidationException({
          userName: ['Username is already registered'],
        });
      }
    }

    // Prepare update data
    const updateData: any = {
      updatedBy,
    };

    if (dto.email) updateData.email = dto.email;
    if (dto.userName) updateData.username = dto.userName;

    // Update admin user
    await this.prisma.user.update({
      where: { id },
      data: updateData,
    });

    // Handle UserProfile update/creation
    if (dto.firstName !== undefined || dto.lastName !== undefined) {
      const existingProfile = await this.prisma.userProfile.findUnique({
        where: { userId: id },
      });

      if (existingProfile) {
        // Update existing profile
        await this.prisma.userProfile.update({
          where: { userId: id },
          data: {
            firstName: dto.firstName ?? existingProfile.firstName,
            lastName: dto.lastName ?? existingProfile.lastName,
            updatedBy,
          },
        });
      } else {
        // Create new profile if it doesn't exist
        await this.prisma.userProfile.create({
          data: {
            userId: id,
            firstName: dto.firstName,
            lastName: dto.lastName,
            createdBy: updatedBy,
          },
        });
      }
    }

    // Fetch the complete admin with profile
    const adminWithProfile = await this.prisma.user.findUnique({
      where: { id },
      include: {
        userProfile: true,
      },
    });

    return plainToInstance(AdminResponseDto, adminWithProfile, {
      excludeExtraneousValues: true,
    });
  }


  /**
   * Update admin status
   */
  async updateStatus(
    id: string,
    dto: UpdateMemberStatusDto,
    updatedBy: string,
  ): Promise<AdminResponseDto> {
    // Check if admin exists
    await this.findOne(id);

    const admin = await this.prisma.user.update({
      where: { id: id },
      data: {
        status: dto.status,
        updatedBy: updatedBy,
        updatedAt: new Date(),
      },
      include: {
        userProfile: true,
        userRoles: true
      },
    });

    return plainToInstance(AdminResponseDto, admin, {
      excludeExtraneousValues: true,
    });
  }

  /**
   * Delete admin user
   */
  async delete(id: string, deletedBy: string): Promise<AdminResponseDto> {
    // Prevent self-delete
    if (id === deletedBy) {
      throw new BadRequestException(
        'You cannot delete your own account',
      );
    }
    
    // Check if admin exists
    await this.findOne(id);

    const admin = await this.prisma.user.update({
      where: { id: id },
      data: {
        deletedAt: new Date(),
        deletedBy: deletedBy,
        status: UserStatus.INACTIVE,
      },
      include: {
        userProfile: true,
        userRoles: true
      },
    });

    return plainToInstance(AdminResponseDto, admin, {
      excludeExtraneousValues: true,
    });
  }
}