import { Controller, Get, HttpCode, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser, Public, Roles } from 'src/common/decorators';
import { AirDropEventDTO, LeaderboardRow, LeaderboardRowResponseDto } from './dto/dashboard-toin-response.dto';
import { ReferralProgressResponseDto } from './dto/referral-progress-response.dto';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';
import { PaginatedResponseDto } from 'src/common/dto';
import { UserResponseDto } from 'src/core/auth/dto/auth.dto';
import { UserWalletResponseDto } from 'src/modules/member/dto/user-wallet-response.dto';
import { AdminDashboardService } from './admin-dashboard.service';
import { DashboardStatsResponseDto, UserRegistrationGraphResponseDto } from './dto/dashboard-stats-response.dto';
import { UserRole } from 'src/common/enums/user-role.enum';
import { UserRegistrationGraphQueryDto } from './dto/user-registration-graph-query.dto';



@ApiTags('Dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService,
                private readonly adminDashboardService: AdminDashboardService
    ) { }

    @Get("get-user-toins-summary")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get all kind of user toin summary' })
    @ApiResponse({
        status: 200,
        description: 'Get user toin summary',
        type: UserWalletResponseDto,
    })
    async getUserToinSummary(@CurrentUser() user: UserResponseDto): Promise<UserWalletResponseDto> {
        return this.dashboardService.getUserToinSummary(user.id);
    }

    @Get("get-admin-dashboard-toins-summary")
    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get admin dashboard stats' })
    @ApiResponse({
        status: 200,
        description: 'Admin dashboard stats',
        type: DashboardStatsResponseDto,
    })
    async getAdminDashboardStats(): Promise<DashboardStatsResponseDto> {
        return this.adminDashboardService.getDashboardStats();
    }

    @Get('get-user-registration-graph')
    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @ApiOperation({ summary: 'Get user registration graph data month-wise' })
    @ApiResponse({
        status: 200,
        description: 'User registration graph data retrieved successfully',
        type: UserRegistrationGraphResponseDto,
    })
    async getUserRegistrationGraphData(
        @Query() query: UserRegistrationGraphQueryDto
    ): Promise<UserRegistrationGraphResponseDto> {
        return this.adminDashboardService.getUserRegistrationGraphData(query.startDate,query.endDate);
    }


    @UseGuards(JwtAuthGuard)
    @Get("get-air-drop-events")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get all air Drop Active Events' })
    @ApiResponse({
        status: 200,
        description: 'Air drop details',
        type: AirDropEventDTO,
    })
    async getAirDropEvent(): Promise<AirDropEventDTO> {
        return this.dashboardService.getAirDropEvent();
    }

    @UseGuards(JwtAuthGuard)
    @Get("get-referral-link-events")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get referral Events' })
    @ApiResponse({
        status: 200,
        description: 'Referral code string',
        type: String,
    })
    async getReferralLink(@CurrentUser() user: UserResponseDto): Promise<string> {
        return this.dashboardService.getReferralLink(user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get("send-invitation-by-email/:email")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get send invitation by email' })
    @ApiResponse({
        status: 200,
        description: 'List of challenges',
        type: String,
    })
    async sendInvitationByEmail(@CurrentUser() user: UserResponseDto, email: string): Promise<string> {
        return this.dashboardService.sendInvitationByEmail(user.id, email);
    }


    @UseGuards(JwtAuthGuard)
    @Get("invitation-claimed")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get send invitation by email' })
    @ApiResponse({
        status: 200,
        description: 'Invitation claimed progress',
        type: ReferralProgressResponseDto,
    })
    async invitationClaimed(@CurrentUser() user: UserResponseDto): Promise<ReferralProgressResponseDto> {
        return this.dashboardService.invitationClaimed(user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get("leader-board")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get send invitation by email' })
    @ApiResponse({
        status: 200,
        description: 'List of LeaderboardRow',
        type: PaginatedResponseDto<LeaderboardRow>,
    })
    async leaderBoard(@Query() reqModel: LeaderboardRowResponseDto): Promise<PaginatedResponseDto<LeaderboardRow>> {
        return this.dashboardService.leaderBoard(reqModel);
    }

    @Get("get-http-status")
    @Public()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get List of HTTP status codes' })
    @ApiResponse({
        status: 200,
        description: 'List of HTTP status codes',
        isArray: true,
        type: String,
    })
    async getHttpStatus(): Promise<string[]> {
        return Object.values(HttpStatus).map(v => String(v));
    }



}
