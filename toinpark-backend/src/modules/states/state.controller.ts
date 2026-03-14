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
import { StateService } from './state.service';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';
import { UserRole } from 'src/common/enums/user-role.enum';
import { Roles } from 'src/common/decorators';
import { PaginatedResponseDto } from 'src/common/dto';
import { StateQueryDto, StateResponseDto } from './dto/state.dto';

@ApiTags('States')
@Controller('states')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth("JWT-auth")
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get('list')
  @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all states with search & filter' })
  @ApiResponse({ type: PaginatedResponseDto<StateResponseDto> })
  async findAll(
    @Query() queryDto: StateQueryDto,
  ): Promise<PaginatedResponseDto<StateResponseDto>> {
    const filters = {
      search: queryDto.search?.trim() || '',
      countryId: queryDto.countryId,
    };

    const { items, totalCount } = await this.stateService.findAll(
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