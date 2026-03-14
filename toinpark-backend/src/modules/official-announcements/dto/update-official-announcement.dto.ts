import { PartialType } from '@nestjs/swagger';
import { CreateOfficialAnnouncementDto } from './create-official-announcement.dto';

export class UpdateOfficialAnnouncementDto extends PartialType(CreateOfficialAnnouncementDto) {}

