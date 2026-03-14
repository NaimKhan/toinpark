import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { CreateTicketCategoryDto } from './dto/create-ticket-category.dto';
import { TicketCategoryResponseDto } from './dto/ticket-category-response.dto';
import { UpdateTicketCategoryDto } from './dto/update-ticket-category.dto';
import { ValidationException } from 'src/common/exceptions/validation.exception';
import { DefaultSortField } from 'src/common/enums/default-sort-field.enum';
import { EnumSortOrder } from 'src/common/enums/sort-order.enum';

@Injectable()
export class TicketCategoryService {
  constructor(private prisma: PrismaService) {}

  async create(
    createDto: CreateTicketCategoryDto,
    userId: string,
  ): Promise<TicketCategoryResponseDto> {
    // Check if category with same name already exists
    const categoryExists = await this.prisma.ticketCategory.findFirst({
      where: {
        name: createDto.name,
        deletedAt: null,
      },
    });

    if (categoryExists) {
      throw new ValidationException({ 'name' : ['Ticket category with this name already exists']});
    }

    const category = await this.prisma.ticketCategory.create({
      data: {
        name: createDto.name,
        isActive: true,
        createdBy: userId,
      },
    });

    return plainToInstance(TicketCategoryResponseDto, category, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(
    filters: { search?: string; isActive?: boolean },
    page: number,
    limit: number,
    sortBy: DefaultSortField,
    sortOrder: EnumSortOrder,
  ): Promise<{ items: TicketCategoryResponseDto[]; totalCount: number }> {

    const skip = (page - 1) * limit;
    const take = limit;

    const where: any = { deletedAt: null };
    
    if (filters.isActive !== undefined) {
      where.isActive = filters.isActive;
    }

    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } }
      ];
    }

    let orderBy: any = { createdAt: EnumSortOrder.DESC }; // Default sorting

    if (sortBy) {
      orderBy = { [sortBy]: sortOrder };
    }

    const [data, totalCount] = await Promise.all([
      this.prisma.ticketCategory.findMany({
        where,
        skip,
        take,
        orderBy,
      }),
      this.prisma.ticketCategory.count({ where }),
    ]);
    
    const formattedData = plainToInstance(TicketCategoryResponseDto, data, {
      excludeExtraneousValues: true,
    });

    return { items: formattedData, totalCount };
  }

  async active(): Promise<TicketCategoryResponseDto[]> {
    
   const categories = await this.prisma.ticketCategory.findMany({
      where: {
        deletedAt: null,
        isActive: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return plainToInstance(TicketCategoryResponseDto, categories, {
      excludeExtraneousValues: true,
    });
  }



  async findOne(id: string): Promise<TicketCategoryResponseDto> {
    const category = await this.prisma.ticketCategory.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!category) {
      throw new NotFoundException(`Ticket category with ID ${id} not found`);
    }

    return plainToInstance(TicketCategoryResponseDto, category, {
      excludeExtraneousValues: true,
    });
  }


  async update(
    id: string,
    updateDto: UpdateTicketCategoryDto,
    userId: string,
  ): Promise<TicketCategoryResponseDto> {
    // Check if category exists
    const category = await this.prisma.ticketCategory.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!category) {
      throw new NotFoundException(`Ticket category with ID ${id} not found`);
    }

    // Check if name is being changed and if it conflicts
    if (updateDto.name && updateDto.name !== category.name) {
      const nameExists = await this.prisma.ticketCategory.findFirst({
        where: {
          name: updateDto.name,
          id: { not: id },
          deletedAt: null,
        },
      });

      if (nameExists) {
        throw new ValidationException({ 'name' : ['Ticket category with this name already exists']});
      }
    }

    const updatedCategory = await this.prisma.ticketCategory.update({
      where: { id },
      data: {
        ...(updateDto.name && { name: updateDto.name }),
        updatedBy: userId,
        updatedAt: new Date(),
      },
    });

    return plainToInstance(TicketCategoryResponseDto, updatedCategory, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    // Check if category exists
    const category = await this.prisma.ticketCategory.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!category) {
      throw new NotFoundException(`Ticket category with ID ${id} not found`);
    }

    // Check if category has associated tickets
    const hasTickets = await this.prisma.ticket.count({
      where: {
        ticketCategoryId: id,
        deletedAt: null,
      },
    });

    if (hasTickets > 0) {
      throw new BadRequestException(
        'Cannot delete ticket category with associated tickets',
      );
    }

    // Soft delete
    await this.prisma.ticketCategory.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        deletedBy: userId,
      },
    });
  }

  async toggleStatus(
    id: string,
    userId: string,
  ): Promise<TicketCategoryResponseDto> {
    // Check if category exists
    const category = await this.prisma.ticketCategory.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!category) {
      throw new NotFoundException(`Ticket category with ID ${id} not found`);
    }

    // Toggle status
    const updatedCategory = await this.prisma.ticketCategory.update({
      where: { id },
      data: {
        isActive: !category.isActive,
        updatedBy: userId,
        updatedAt: new Date(),
      },
    });

    return plainToInstance(TicketCategoryResponseDto, updatedCategory, {
      excludeExtraneousValues: true,
    });
  }
}