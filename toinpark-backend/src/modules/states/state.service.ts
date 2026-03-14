import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/core';
import { StateResponseDto } from './dto/state.dto';
import { DefaultSortField } from 'src/common/enums/default-sort-field.enum';
import { EnumSortOrder } from 'src/common/enums/sort-order.enum';

@Injectable()
export class StateService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    filters: any,
    page?: number,
    limit?: number,
    sortBy?: DefaultSortField,
    sortOrder?: EnumSortOrder,
  ): Promise<{ items: StateResponseDto[]; totalCount: number }> {
    const where: any = {
      deletedAt: null,
      ...(filters.isActive !== undefined && { isActive: filters.isActive }),
    };

    // Search by state name or country name
    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        {
          country: {
            name: { contains: filters.search, mode: 'insensitive' },
          },
        },
      ];
    }

    if (filters.countryId) {
      where.countryId = filters.countryId;
    }

    let orderBy: any = { createdAt: EnumSortOrder.DESC }; // Default sorting

    if (sortBy) {
      orderBy = { [sortBy]: sortOrder };
    }

    const queryOptions: {
      where: any;
      include: any;
      orderBy: any;
      skip?: number;
      take?: number;
    } = {
      where,
      include: {
        country: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
      orderBy,
    };

    if (page && limit) {
      queryOptions.skip = (page - 1) * limit;
      queryOptions.take = limit;
    }

    const [items, totalCount] = await Promise.all([
      this.prisma.state.findMany(queryOptions),
      this.prisma.state.count({ where }),
    ]);

    return {
      items: plainToInstance(StateResponseDto, items, {
        excludeExtraneousValues: true,
      }) as unknown as StateResponseDto[],
      totalCount,
    };
  }
}