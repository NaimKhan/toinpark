import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateTutorialCategoryDto } from './create-tutorial-category.dto';

export class UpdateTutorialCategoryDto extends PartialType(CreateTutorialCategoryDto) {}
