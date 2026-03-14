import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { CreateUserWalletAddressDto } from './dto/create-user-wallet-address.dto';
import { UpdateUserWalletAddressDto } from './dto/update-user-wallet-address.dto';
import { UserWalletAddressResponseDto } from './dto/user-wallet-address-response.dto';

import { UserWalletAddressQueryDto } from './dto/user-wallet-address-query.dto';
import { UserRole } from 'src/common/enums/user-role.enum';

@Injectable()
export class UserWalletAddressService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createDto: CreateUserWalletAddressDto,
    userId: string,
  ): Promise<UserWalletAddressResponseDto> {
    
    // Check if this is the first address for the user
    const existingCount = await this.prisma.userWalletAddress.count({
      where: {
        userId,
        deletedAt: null
      }
    });

    let isDefault = createDto.isDefault;

    if (existingCount === 0) {
      // First address must be default
      isDefault = true;
    }

    // If setting as default, unset other defaults for this user
    if (isDefault) {
      await this.prisma.userWalletAddress.updateMany({
        where: {
          userId,
          isDefault: true,
          deletedAt: null,
        },
        data: {
          isDefault: false,
        },
      });
    }

    const walletAddress = await this.prisma.userWalletAddress.create({
      data: {
        ...createDto,
        isDefault,
        userId,
        createdBy: userId,
      },
    });

    return plainToInstance(UserWalletAddressResponseDto, walletAddress, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(
    paginationDto: UserWalletAddressQueryDto,
    currentUserRole: UserRole, // Used to check if admin
    currentUserId: string // Used to filter for member
  ): Promise<{ items: UserWalletAddressResponseDto[]; totalCount: number }> {
    
    const { page, limit, sortBy, sortOrder, search, userId } = paginationDto;
    const skip = (page - 1) * limit;
    const take = limit;

    const where: any = { deletedAt: null };

    // Filtering logic
    if (currentUserRole === UserRole.MEMBER) {
       // Members can only see their own
       where.userId = currentUserId;
    } else {
      // Admins can see all, or filter by specific userId if provided
      if (userId) {
        where.userId = userId;
      }
    }
    
    // Search (optional, if name is searchable)
    if (search) {
       where.OR = [
         { name: { contains: search, mode: 'insensitive' } },
         { walletAccountId: { contains: search, mode: 'insensitive' } }
       ];
    }

    let orderBy: any = { createdAt: 'desc' };
    if (sortBy) {
        orderBy = { [sortBy]: sortOrder || 'desc' };
    }


    const [data, totalCount] = await Promise.all([
      this.prisma.userWalletAddress.findMany({
        where,
        skip,
        take,
        orderBy,
      }),
      this.prisma.userWalletAddress.count({ where }),
    ]);

    const items = plainToInstance(UserWalletAddressResponseDto, data, {
      excludeExtraneousValues: true,
    });

    return { items, totalCount };
  }

  async findOne(id: string, userId: string): Promise<UserWalletAddressResponseDto> {
    const walletAddress = await this.prisma.userWalletAddress.findFirst({
      where: {
        id,
        userId,
        deletedAt: null,
      },
    });

    if (!walletAddress) {
      throw new NotFoundException(`User wallet address with ID ${id} not found`);
    }

    return plainToInstance(UserWalletAddressResponseDto, walletAddress, {
      excludeExtraneousValues: true,
    });
  }

  async update(
    id: string,
    updateDto: UpdateUserWalletAddressDto,
    userId: string,
  ): Promise<UserWalletAddressResponseDto> {
    const walletAddress = await this.prisma.userWalletAddress.findFirst({
      where: {
        id,
        userId,
        deletedAt: null,
      },
    });

    if (!walletAddress) {
      throw new NotFoundException(`User wallet address with ID ${id} not found`);
    }

    // If setting as default, unset other defaults for this user
    if (updateDto.isDefault) {
      await this.prisma.userWalletAddress.updateMany({
        where: {
          userId,
          id: { not: id },
          isDefault: true,
          deletedAt: null,
        },
        data: {
          isDefault: false,
        },
      });
    }

    const updatedWalletAddress = await this.prisma.userWalletAddress.update({
      where: { id },
      data: {
        ...updateDto,
        updatedBy: userId,
      },
    });

    return plainToInstance(UserWalletAddressResponseDto, updatedWalletAddress, {
      excludeExtraneousValues: true,
    });
  }
}
