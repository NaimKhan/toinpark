import {
  Controller,
  Get,
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
} from '@nestjs/swagger';
import { CountryService } from './country.service';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';
import { UserRole } from 'src/common/enums/user-role.enum';
import { Roles } from 'src/common/decorators';
import { PaginatedResponseDto, PaginationQueryDto } from 'src/common/dto';
import { CountryResponseDto } from './dto/country.dto';
import { CountryQueryDto } from './dto/country-query.dto';


@ApiTags('Countries')
@Controller('countries')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth("JWT-auth")
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get('list')
  @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all countries with search & filter' })
  @ApiResponse({ type: PaginatedResponseDto<CountryResponseDto> })
  async findAll(
    @Query() queryDto: CountryQueryDto,
  ): Promise<PaginatedResponseDto<CountryResponseDto>> {
    const filters = {
      search: queryDto.search?.trim() || '',
    };

    const { items, totalCount } = await this.countryService.findAll(
      filters,
      undefined,
      undefined,
      queryDto.sortBy,
      queryDto.sortOrder,
    );

    return new PaginatedResponseDto(
      items,
      totalCount,
      1,
      totalCount || 1,
    );
  }
}