import { Controller, Get, HttpCode, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser, Roles } from 'src/common/decorators';
import { PaginatedResponseDto } from 'src/common/dto';
import { UserRole } from 'src/common/enums/user-role.enum';
import { EmailOrPhoneChangeLogRequestDto, EmailOrPhoneChangeLogResponseDto } from './dto/email-or-phone-change-log-response.dto/email-or-phone-change-log-response.dto';
import { UserResponseDto } from 'src/core/auth/dto/auth.dto';
import { EmailOrPhoneChangeLogService } from './email-or-phone-change-log.service';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';

@Controller('email-or-phone-change-log')
@ApiTags('Email-or-Phone-change-log')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class EmailOrPhoneChangeLogController {
    constructor(private readonly service: EmailOrPhoneChangeLogService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @ApiOperation({ summary: 'Get all transactions with pagination' })
    @ApiResponse({
        status: 200,
        type: PaginatedResponseDto<EmailOrPhoneChangeLogResponseDto>,
    })
    async findAll(
        @Query() queryDto: EmailOrPhoneChangeLogRequestDto,
        @CurrentUser() user: UserResponseDto,
    ): Promise<PaginatedResponseDto<EmailOrPhoneChangeLogResponseDto>> {
        const filters = {
            search: queryDto.search?.trim() || '',
            changeType: queryDto.changeType,
            userId: queryDto.userId,
        };

        const { items, totalCount } = await this.service.findAll(
            filters,
            queryDto.page,
            queryDto.limit,
            queryDto.sortBy,
            queryDto.sortOrder
        );

        return new PaginatedResponseDto(
            items,
            totalCount,
            queryDto.page,
            queryDto.limit,
        );
    }
}
