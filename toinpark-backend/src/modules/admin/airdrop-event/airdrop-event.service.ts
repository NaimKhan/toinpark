import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { CreateAirDropEventDto } from './dto/create-airdrop-event.dto';
import { UpdateAirDropEventDto } from './dto/update-airdrop-event.dto';
import { AirDropEventResponseDto } from './dto/airdrop-event-response.dto';

@Injectable()
export class AirDropEventService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get all Airdrop events with filters
   */
  async findAll(filters: { search?: string; isActive?: boolean }, page: number,limit: number): Promise<{ items: AirDropEventResponseDto[]; totalCount: number }> {
    const skip = (page - 1) * limit;
    const take = limit;

    const where: any = { deletedAt: null };

    if (filters.isActive !== undefined) {
      where.isActive = filters.isActive;
    }

    if (filters.search) {
      where.OR = [
        { eventName: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const [data, totalCount] = await Promise.all([
      this.prisma.airDropEvent.findMany({
        where,
        skip,
        take,
        orderBy: { eventStartDate: 'desc' },
      }),
      this.prisma.airDropEvent.count({ where }),
    ]);

    const formattedData = plainToInstance(AirDropEventResponseDto, data, {
      excludeExtraneousValues: true,
    });

    return { items: formattedData, totalCount };
  }


  /**
   * Create a new Airdrop event
   */
  async create(createDto: CreateAirDropEventDto, createdBy?: string): Promise<AirDropEventResponseDto> {
    // Check if event name already exists
    const existing = await this.prisma.airDropEvent.findUnique({
      where: { eventName: createDto.eventName },
    });

    if (existing) {
      throw new ConflictException(
        `Airdrop event with name '${createDto.eventName}' already exists`,
      );
    }

    const event = await this.prisma.airDropEvent.create({
      data: {
        eventName: createDto.eventName,
        totalAmount: createDto.totalAmount,
        usdConversionRate: createDto.usdConversionRate,
        eventStartDate: createDto.eventStartDate,
        eventEndDate: createDto.eventEndDate,
        usedAmount: 0,
        isActive: false,
        createdBy,
      },
    });

    return plainToInstance(AirDropEventResponseDto, event);
  }


  /**
   * Get a single Airdrop event by ID
   */
  async findOne(id: string): Promise<AirDropEventResponseDto> {
    const event = await this.prisma.airDropEvent.findFirst({
      where: { id, deletedAt: null },
    });

    if (!event) {
      throw new NotFoundException(`Airdrop event with ID ${id} not found`);
    }

    return plainToInstance(AirDropEventResponseDto, event);
  }


  /**
   * Update an Airdrop event
   */
  async update(id: string, updateDto: UpdateAirDropEventDto, updatedBy?: string): Promise<AirDropEventResponseDto> {
    await this.findOne(id);

    if (updateDto.eventName) {
      const existing = await this.prisma.airDropEvent.findFirst({
        where: {
          eventName: updateDto.eventName,
          id: { not: id },
          deletedAt: null,
        },
      });

      if (existing) {
        throw new ConflictException(
          `Airdrop event with name '${updateDto.eventName}' already exists`,
        );
      }
    }

    const updated = await this.prisma.airDropEvent.update({
      where: { id },
      data: {
        ...(updateDto.eventName && { eventName: updateDto.eventName }),
        ...(updateDto.totalAmount !== undefined && {
          totalAmount: updateDto.totalAmount,
        }),
        ...(updateDto.usdConversionRate !== undefined && {
          usdConversionRate: updateDto.usdConversionRate,
        }),
        ...(updateDto.eventStartDate && {
          eventStartDate: updateDto.eventStartDate,
        }),
        ...(updateDto.eventEndDate && { eventEndDate: updateDto.eventEndDate }),
        updatedAt: new Date(),
        updatedBy,
      },
    });

    return plainToInstance(AirDropEventResponseDto, updated);
  }


  /**
   * Soft delete an Airdrop event
   */
  async remove(id: string, deletedBy?: string): Promise<AirDropEventResponseDto> {
    const event = await this.findOne(id);

    if (event.isActive) {
      throw new BadRequestException('Active Airdrop events cannot be deleted');
    }

    const updated = await this.prisma.airDropEvent.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        deletedBy,
      },
    });

    return plainToInstance(AirDropEventResponseDto, updated);
  }


  
  /**
   * Toggle active status of an Airdrop event
   */
  async toggleActive(id: string): Promise<AirDropEventResponseDto> {
    const event = await this.findOne(id);

    return this.prisma.$transaction(async (tx) => {
      await tx.airDropEvent.updateMany({
        where: {
          id: { not: id },
        },
        data: {
          isActive: false,
          updatedAt: new Date(),
        },
      });

      const updated = await tx.airDropEvent.update({
        where: { id },
        data: {
          isActive: !event.isActive,
          updatedAt: new Date(),
        },
      });

      return plainToInstance(AirDropEventResponseDto, updated);
    });
  }

}
