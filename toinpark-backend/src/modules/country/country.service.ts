import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/core';
import { CountryResponseDto } from './dto/country.dto';
import { DefaultSortField } from 'src/common/enums/default-sort-field.enum';
import { EnumSortOrder } from 'src/common/enums/sort-order.enum';

@Injectable()
export class CountryService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    filters: any,
    page?: number,
    limit?: number,
    sortBy?: DefaultSortField,
    sortOrder?: EnumSortOrder,
  ): Promise<{ items: CountryResponseDto[]; totalCount: number }> {
    const where: any = {
      deletedAt: null,
      ...(filters.isActive !== undefined && { isActive: filters.isActive }),
    };

    // Search by country name or code
    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { code: { contains: filters.search, mode: 'insensitive' } },
      ];
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
        _count: {
          select: { states: true },
        },
      },
      orderBy,
    };

    if (page && limit) {
      queryOptions.skip = (page - 1) * limit;
      queryOptions.take = limit;
    }

    const [items, totalCount] = await Promise.all([
      this.prisma.country.findMany(queryOptions),
      this.prisma.country.count({ where }),
    ]);

    return {
      items: plainToInstance(CountryResponseDto, items, {
        excludeExtraneousValues: true,
      }) as unknown as CountryResponseDto[],
      totalCount,
    };
  }
}