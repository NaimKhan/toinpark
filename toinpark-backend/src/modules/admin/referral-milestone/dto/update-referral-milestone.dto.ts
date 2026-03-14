import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateReferralMilestoneDto } from './create-referral-milestone.dto';

export class UpdateReferralMilestoneDto extends PartialType(CreateReferralMilestoneDto) {}
