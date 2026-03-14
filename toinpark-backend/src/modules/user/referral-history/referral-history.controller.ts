import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';
import { ReferralHistoryService } from './referral-history.service';
import { DashboardReferralMileStoneResponseDto } from '../dashboard/dto/dashboard-toin-response.dto';

@Controller('referral-milestone')
@ApiTags('Referral milestone')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class ReferralHistoryController {

    constructor(private readonly service: ReferralHistoryService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get referral milestones' })
    @ApiResponse({
        status: 200,
        description: 'List of referral milestones',
        type: DashboardReferralMileStoneResponseDto,
        isArray: true,
    })
    async referralMilestoneList(): Promise<DashboardReferralMileStoneResponseDto[]> {
        return this.service.referralMilestoneList();
    }
}
