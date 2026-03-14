import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core';
import { EmailOrPhoneChangeLogRequestDto, EmailOrPhoneChangeLogResponseDto } from './dto/email-or-phone-change-log-response.dto/email-or-phone-change-log-response.dto';
import { EnumSortOrder } from 'src/common/enums/sort-order.enum';
import { plainToInstance } from 'class-transformer';
import { EmailOrPhoneChangeLogChangeType, EmailOrPhoneChangeLogSortField } from './dto/email-or-phone-change-log-response.dto/email-or-phone-enum';

@Injectable()
export class EmailOrPhoneChangeLogService {

    constructor(private prisma: PrismaService) { }
    async findAll(filters: EmailOrPhoneChangeLogRequestDto,
        page = 1,
        limit = 10,
        sortBy: EmailOrPhoneChangeLogSortField,
        sortOrder: EnumSortOrder
    ): Promise<{ items: EmailOrPhoneChangeLogResponseDto[]; totalCount: number }> {

        const skip = (page - 1) * limit;

        const where: any = {
            deletedAt: null,
            ...(filters.changeType && { changeType: filters.changeType }),
            ...(filters.userId && { userId: filters.userId }),
        };

        if (filters.search) {
            where.OR = [
                { userName: { contains: filters.search, mode: 'insensitive' } },
                { fullName: { contains: filters.search, mode: 'insensitive' } },
                { oldValue: { contains: filters.search, mode: 'insensitive' } },
                { newValue: { contains: filters.search, mode: 'insensitive' } },
                { remarks: { contains: filters.search, mode: 'insensitive' } },
            ];
        }

        let orderBy: any = { createdAt: EnumSortOrder.DESC }; // Default sorting

        if (sortBy) {
            orderBy = { [sortBy]: sortOrder };
        }

        const [items, totalCount] = await Promise.all([
            this.prisma.userChangeHistoryForEmailOrPhone.findMany({
                where,
                skip,
                take: limit,
                orderBy,
            }),
            this.prisma.userChangeHistoryForEmailOrPhone.count({ where })
        ]);

        let logInfo = plainToInstance(EmailOrPhoneChangeLogResponseDto, items, { excludeExtraneousValues: true });

        return {
            items: logInfo,
            totalCount,
        };
    }

}
