import {
    BadRequestException,
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseGuards,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
    ApiBody,
} from '@nestjs/swagger';
import { ReferralLevelService } from './referral-level.service';
import { CreateReferralLevelDto } from './dto/create-referral-level.dto';
import {
    ReferralLevelResponseDto
} from './dto/referral-level-response.dto';
import { PaginatedResponseDto, PaginationQueryDto } from 'src/common/dto';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';
import { CurrentUser, Roles } from 'src/common/decorators';
import { UserRole } from 'src/common/enums/user-role.enum';
import { UserResponseDto } from 'src/core/auth/dto/auth.dto';
import { BulkCreateReferralLevelDto, BulkUpdateReferralLevelDto } from './dto/bulk-referral-level.dto';
import { BulkReferralLevelResponseDto } from './dto/bulk-response.dto';
import { ReferralLevelQueryDto } from './dto/referral-level-query.dto';
import { MemberReferralLevelPaginatedResponseDto } from './dto/member-referral-level-response.dto';
import { LevelMemberQueryDto } from './dto/level-member-query.dto';

@ApiTags('Referral Levels')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
@Controller('referral-levels')
export class ReferralLevelController {
    constructor(private readonly referralLevelService: ReferralLevelService) { }

    @Get()
    @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
    @ApiOperation({ summary: 'Get all referral levels with pagination' })
    @ApiResponse({
        status: 200,
        description: 'List of referral levels',
        type: PaginatedResponseDto<ReferralLevelResponseDto>
    })
    async findAll(@Query() paginationDto: ReferralLevelQueryDto): Promise<PaginatedResponseDto<ReferralLevelResponseDto>> {

        const filters = {
            search: paginationDto.search?.trim() || '',
        };

        // Pass page and limit directly, let service calculate skip/take
        const { items, totalCount } = await this.referralLevelService.findAll(
            filters,
            paginationDto.page,
            paginationDto.limit,
            paginationDto.sortBy,
            paginationDto.sortOrder
        );

        return new PaginatedResponseDto<ReferralLevelResponseDto>(
            items,
            totalCount,
            paginationDto.page,
            paginationDto.limit,
        );
    }

    @Get('member')
    @Roles(UserRole.MEMBER)
    @ApiOperation({ summary: 'Get all referral levels for member with transaction counts' })
    @ApiResponse({
        status: 200,
        description: 'List of referral levels with transaction counts',
        type: MemberReferralLevelPaginatedResponseDto
    })
    async findAllForMember(@Query() paginationDto: ReferralLevelQueryDto, @CurrentUser() user: UserResponseDto): Promise<MemberReferralLevelPaginatedResponseDto> {

        const filters = {
            search: paginationDto.search?.trim() || '',
        };

        const { items, totalCount, totalReferralMembers } = await this.referralLevelService.findAllForMember(
            filters,
            paginationDto.page,
            paginationDto.limit,
            paginationDto.sortBy,
            paginationDto.sortOrder,
            user.id
        );

        return new MemberReferralLevelPaginatedResponseDto(
            items,
            totalCount,
            paginationDto.page,
            paginationDto.limit,
            totalReferralMembers
        );
    }


    @Get('members/:levelId/:userId')
    @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
    @ApiOperation({ summary: 'Get level-wise referral members for a user' })
    @ApiResponse({
        status: 200,
        description: 'Paginated list of level members',
        type: PaginatedResponseDto<UserResponseDto>
    })
    async findLevelMembers(
        @Param('levelId') levelId: string,
        @Param('userId') userId: string,
        @Query() query: LevelMemberQueryDto,
        @CurrentUser() currentUser: UserResponseDto
    ): Promise<PaginatedResponseDto<UserResponseDto>> {
        // Validation: Members can only access their own details
        if (currentUser.userRole === UserRole.MEMBER && currentUser.id !== userId) {
            throw new BadRequestException('You can only view your own referrals');
        }

        const { items, totalCount } = await this.referralLevelService.findLevelMembers(
            userId,
            levelId,
            query
        );

        return new PaginatedResponseDto<UserResponseDto>(
            items,
            totalCount,
            query.page,
            query.limit,
        );
    }

    // @Post('bulk')
    // @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    // @HttpCode(HttpStatus.CREATED)
    // @ApiOperation({ summary: 'Bulk create referral levels' })
    // @ApiBody({ type: BulkCreateReferralLevelDto })
    // @ApiResponse({
    //     status: 201,
    //     description: 'Bulk create operation completed',
    //     type: BulkReferralLevelResponseDto,
    // })
    // @ApiResponse({
    //     status: 400,
    //     description: 'Bad request - Duplicate level numbers in request',
    // })
    // async bulkCreate(
    //     @Body() bulkCreateDto: BulkCreateReferralLevelDto,
    //     @CurrentUser() user: UserResponseDto,
    // ): Promise<BulkReferralLevelResponseDto> {
    //     return await this.referralLevelService.bulkCreate(bulkCreateDto, user.id);
    // }


    // @Patch('bulk-update')
    // @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    // @HttpCode(HttpStatus.OK)
    // @ApiOperation({ summary: 'Bulk update referral levels' })
    // @ApiBody({ type: BulkUpdateReferralLevelDto })
    // @ApiResponse({
    //     status: 200,
    //     description: 'Bulk update operation completed',
    //     type: BulkReferralLevelResponseDto,
    // })
    // @ApiResponse({
    //     status: 400,
    //     description: 'Bad request - Duplicate IDs or level numbers in request',
    // })
    // async bulkUpdate(
    //     @Body() bulkUpdateDto: BulkUpdateReferralLevelDto,
    //     @CurrentUser() user: UserResponseDto,
    // ): Promise<BulkReferralLevelResponseDto> {
    //     return await this.referralLevelService.bulkUpdate(bulkUpdateDto, user.id);
    // }




    @Post()
    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @ApiOperation({ summary: 'Create a new referral level' })
    @ApiResponse({
        status: 201,
        description: 'Referral level created successfully',
        type: ReferralLevelResponseDto,
    })
    @ApiResponse({ status: 409, description: 'Level name already exists' })
    async create(@Body() createDto: CreateReferralLevelDto, @CurrentUser() user: UserResponseDto): Promise<ReferralLevelResponseDto> {
        return await this.referralLevelService.create(createDto, user.id);
    }

    @Get(':id')
    @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
    @ApiOperation({ summary: 'Get a referral level by ID' })
    @ApiResponse({
        status: 200,
        description: 'Referral level found',
        type: ReferralLevelResponseDto,
    })
    @ApiResponse({ status: 404, description: 'Referral level not found' })
    async findOne(@Param('id') id: string): Promise<ReferralLevelResponseDto> {
        return await this.referralLevelService.findOne(id);
    }

    @Patch(':id')
    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @ApiOperation({ summary: 'Update a referral level' })
    @ApiResponse({
        status: 200,
        description: 'Referral level updated successfully',
        type: ReferralLevelResponseDto,
    })
    @ApiResponse({ status: 404, description: 'Referral level not found' })
    @ApiResponse({ status: 409, description: 'Level name already exists' })
    async update(@Param('id') id: string, @Body() updateDto: CreateReferralLevelDto, @CurrentUser() user: UserResponseDto): Promise<ReferralLevelResponseDto> {
        return await this.referralLevelService.update(id, updateDto, user.id);
    }

    @Delete(':id')
    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @ApiOperation({ summary: 'Soft delete a referral level' })
    @ApiResponse({
        status: 200,
        description: 'Referral level deleted successfully',
    })
    @ApiResponse({ status: 404, description: 'Referral level not found' })
    async remove(@Param('id') id: string, @CurrentUser() user: UserResponseDto): Promise<ReferralLevelResponseDto> {
        return await this.referralLevelService.remove(id, user.id);
    }

    @Patch(':id/toggle-active')
    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @ApiOperation({ summary: 'Toggle active status of a referral level' })
    @ApiResponse({
        status: 200,
        description: 'Active status toggled successfully',
        type: ReferralLevelResponseDto,
    })
    @ApiResponse({ status: 404, description: 'Referral level not found' })
    async toggleActive(@Param('id') id: string): Promise<ReferralLevelResponseDto> {
        return await this.referralLevelService.toggleActive(id);
    }


}