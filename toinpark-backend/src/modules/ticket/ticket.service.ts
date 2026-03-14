import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { plainToInstance } from 'class-transformer';
import { TicketStatus, TicketPriority, Ticket } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketResponseDto } from './dto/ticket-response.dto';
import { UserResponseDto } from 'src/core/auth/dto/auth.dto';
import { TicketSortField } from './dto/ticket-sort-field.enum';
import { EnumSortOrder } from 'src/common/enums/sort-order.enum';
import { generateTicketNo } from 'src/common/utils/string.util';

@Injectable()
export class TicketService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateTicketDto, userId: string): Promise<TicketResponseDto> {
    // Check if category exists
    const categoryExists = await this.prisma.ticketCategory.findFirst({
      where: {
        id: createDto.ticketCategoryId,
        deletedAt: null,
        isActive: true,
      },
    });

    if (!categoryExists) {
      throw new NotFoundException(
        `Ticket category with ID ${createDto.ticketCategoryId} not found or inactive`,
      );
    }

    const ticketNo = generateTicketNo();

    const ticket = await this.prisma.ticket.create({
      data: {
        ticketNo,
        subject: createDto.subject,
        description: "",
        ticketCategoryId: createDto.ticketCategoryId,
        priority: createDto.priority ?? TicketPriority.MEDIUM,
        createdBy: userId,
        messages: {
          create: {
            message: createDto.description,
            senderId: userId,
            createdBy: userId,
          },
        },
      },
      include: {
        category: true,
        creator: {
          select: {
            id: true,
            username: true,
            email: true,
            phoneNumber: true,
            toinAccountNumber: true,
            userProfile: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    return plainToInstance(TicketResponseDto, ticket, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(
    filters: any,
    page: number,
    limit: number,
    sortBy: TicketSortField,
    sortOrder: EnumSortOrder,
    user?: UserResponseDto,
  ): Promise<{ items: TicketResponseDto[]; totalCount: number }> {
    const skip = (page - 1) * limit;

    const where: any = {
      deletedAt: null,
    };

   
    if (filters.search) {
      where.OR = [
        { ticketNo: { contains: filters.search, mode: 'insensitive' } },
        { subject: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.priority) {
      where.priority = filters.priority;
    }

    if (filters.categoryId) {
      where.ticketCategoryId = filters.categoryId;
    }

    if (filters.createdBy) {
      where.createdBy = filters.createdBy;
    }

    let orderBy: any = { createdAt: EnumSortOrder.DESC }; // Default sorting

    if (sortBy) {
      orderBy = { [sortBy]: sortOrder };
    }

    const [items, totalCount] = await Promise.all([
      this.prisma.ticket.findMany({
        where,
        skip,
        take: limit,
        include: {
          category: true,
          creator: {
            select: {
              id: true,
              username: true,
              email: true,
              phoneNumber: true,
              toinAccountNumber: true,
              userProfile: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        },
        orderBy,
      }),
      this.prisma.ticket.count({ where }),
    ]);

    return {
      items: plainToInstance(TicketResponseDto, items, {
        excludeExtraneousValues: true,
      }),
      totalCount,
    };
  }


  async findOne(id: string, user: UserResponseDto): Promise<TicketResponseDto> {
    const ticket = await this.prisma.ticket.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        category: true,
        creator: {
          select: {
            id: true,
            username: true,
            email: true,
            phoneNumber: true,
            toinAccountNumber: true,
            userProfile: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        messages: {
          where: {
            deletedAt: null,
          },
          orderBy: {
            createdAt: 'asc',
          },
          include: {
            sender: {
              select: {
                id: true,
                username: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }

    return plainToInstance(TicketResponseDto, ticket, {
      excludeExtraneousValues: true,
    });
  }


  async sendReply(
    ticketId: string,
    message: string,
    user: UserResponseDto,
  ): Promise<TicketResponseDto> {
    // Check if ticket exists
    const ticket = await this.prisma.ticket.findFirst({
      where: {
        id: ticketId,
        deletedAt: null,
      },
    });

    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${ticketId} not found`);
    }

    // Check if ticket is closed
    if (ticket.status === TicketStatus.CLOSED) {
      throw new BadRequestException('Cannot send messages to a closed ticket');
    }

    // Create message
    await this.prisma.ticketMessage.create({
      data: {
        ticketId,
        message,
        senderId: user.id,
        createdBy: user.id,
      },
    });

    // Return updated ticket with all messages
    return await this.findOne(ticketId, user);
  }

  async update(
    id: string,
    updateDto: CreateTicketDto,
    user: UserResponseDto,
  ): Promise<TicketResponseDto> {
    // Check if ticket exists
    const ticket = await this.prisma.ticket.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }

    // Check if category exists (if being updated)
    if (updateDto.ticketCategoryId) {
      const categoryExists = await this.prisma.ticketCategory.findFirst({
        where: {
          id: updateDto.ticketCategoryId,
          deletedAt: null,
          isActive: true,
        },
      });

      if (!categoryExists) {
        throw new NotFoundException(
          `Ticket category with ID ${updateDto.ticketCategoryId} not found or inactive`,
        );
      }
    }

    const updatedTicket = await this.prisma.ticket.update({
      where: { id },
      data: {
        ...(updateDto.subject && { subject: updateDto.subject }),
        ...(updateDto.description && { description: updateDto.description }),
        ...(updateDto.ticketCategoryId && {
          ticketCategoryId: updateDto.ticketCategoryId,
        }),
        ...(updateDto.priority && { priority: updateDto.priority }),
        updatedBy: user.id,
        updatedAt: new Date(),
      },
      include: {
        category: true,
        creator: {
          select: {
            id: true,
            username: true,
            email: true,
            phoneNumber: true,
            toinAccountNumber: true,
            userProfile: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    return plainToInstance(TicketResponseDto, updatedTicket, {
      excludeExtraneousValues: true,
    });
  }

  async updateStatus(
    id: string,
    status: TicketStatus,
    userId: string,
  ): Promise<TicketResponseDto> {
    // Check if ticket exists
    const ticket = await this.prisma.ticket.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }

    const updateData: any = {
      status,
      updatedBy: userId,
      updatedAt: new Date(),
    };

    // Set respondedAt if status is being changed from OPEN for the first time
    if (
      ticket.status === TicketStatus.OPEN &&
      status !== TicketStatus.OPEN &&
      !ticket.respondedAt
    ) {
      updateData.respondedAt = new Date();
    }

    const updatedTicket = await this.prisma.ticket.update({
      where: { id },
      data: updateData,
      include: {
        category: true,
        creator: {
          select: {
            id: true,
            username: true,
            email: true,
            phoneNumber: true,
            toinAccountNumber: true,
            userProfile: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    return plainToInstance(TicketResponseDto, updatedTicket, {
      excludeExtraneousValues: true,
    });
  }

  async updatePriority(
    id: string,
    priority: TicketPriority,
    userId: string,
  ): Promise<TicketResponseDto> {
    // Check if ticket exists
    const ticket = await this.prisma.ticket.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }

    const updatedTicket = await this.prisma.ticket.update({
      where: { id },
      data: {
        priority,
        updatedBy: userId,
        updatedAt: new Date(),
      },
      include: {
        category: true,
        creator: {
          select: {
            id: true,
            username: true,
            email: true,
            phoneNumber: true,
            toinAccountNumber: true,
            userProfile: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    return plainToInstance(TicketResponseDto, updatedTicket, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string, user: UserResponseDto): Promise<void> {
    // Check if ticket exists
    const ticket = await this.prisma.ticket.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }

    // Soft delete
    await this.prisma.ticket.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        deletedBy: user.id,
      },
    });
  }
}