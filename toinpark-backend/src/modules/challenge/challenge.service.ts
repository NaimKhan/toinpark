import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { plainToInstance } from 'class-transformer';
import { ChallengeResponseDto } from './dto/challenge-response.dto';
import { Decimal } from '@prisma/client/runtime/library';
import { ChallengeSortField } from './dto/challenge-sort-field.enum';
import { EnumSortOrder } from 'src/common/enums/sort-order.enum';


@Injectable()
export class ChallengeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateChallengeDto, createdBy: string): Promise<ChallengeResponseDto> {
    const challenge = await this.prisma.challenge.create({
      data: {
        ...dto,
        createdBy: createdBy,
      },
    });

    return plainToInstance(ChallengeResponseDto, challenge, {
      excludeExtraneousValues: true
    });
  }

  async findAll(filters: any, page = 1, limit = 10, sortBy: ChallengeSortField, sortOrder: EnumSortOrder): Promise<{ items: ChallengeResponseDto[]; totalCount: number }> {
    const skip = (page - 1) * limit;

    const where: any = {
      deletedAt: null,
      ...(filters.search && {
        challengeTitle: { contains: filters.search, mode: 'insensitive' },
      }),
      ...(filters.isActive !== undefined && { isActive: filters.isActive }),
    };

    let orderBy: any = { createdAt: EnumSortOrder.DESC }; // Default sorting

    if (sortBy) {
      orderBy = { [sortBy]: sortOrder };
    }

    const [items, totalCount] = await Promise.all([
      this.prisma.challenge.findMany({
        where,
        skip,
        take: limit,
        orderBy,
      }),
      this.prisma.challenge.count({ where }),
    ]);

    return { items: plainToInstance(ChallengeResponseDto, items, {
      excludeExtraneousValues: true
    }), totalCount };

  }

  async findOne(id: string): Promise<ChallengeResponseDto> {
    const challenge = await this.prisma.challenge.findUnique({
      where: { id: id },
    });
    
    if (!challenge) throw new NotFoundException('Challenge not found');

    return plainToInstance(ChallengeResponseDto, challenge, {
      excludeExtraneousValues: true
    });
  }

  async update(id: string, dto: UpdateChallengeDto, updatedBy: string): Promise<ChallengeResponseDto> {
    const existing = await this.findOne(id);
    const challenge = await this.prisma.challenge.update({
      where: { id: id },
      data: {
        ...dto,
        updatedBy: updatedBy,
        updatedAt: new Date(),
      },
    });

    return plainToInstance(ChallengeResponseDto, challenge, {
      excludeExtraneousValues: true
    });
  }

  async remove(id: string, deletedBy: string): Promise<ChallengeResponseDto> {
    const existing = await this.findOne(id);
    

    const challenge = await this.prisma.challenge.update({
      where: { id: id },
      data: {
        deletedAt: new Date(),
        deletedBy: deletedBy,
      },
    });

    return plainToInstance(ChallengeResponseDto, challenge, {
      excludeExtraneousValues: true
    });
  }

  async toggleActive(id: string): Promise<ChallengeResponseDto> {
    const challenge = await this.findOne(id);
    const updatedChallenge = await this.prisma.challenge.update({
      where: { id: id },
      data: { isActive: !challenge.isActive },
    });

    return plainToInstance(ChallengeResponseDto, updatedChallenge, {
      excludeExtraneousValues: true
    });
  }
  
}
