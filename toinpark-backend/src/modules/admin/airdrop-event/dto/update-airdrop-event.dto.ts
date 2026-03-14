import { PartialType } from '@nestjs/swagger';
import { CreateAirDropEventDto } from './create-airdrop-event.dto';

export class UpdateAirDropEventDto extends PartialType(CreateAirDropEventDto) {}
