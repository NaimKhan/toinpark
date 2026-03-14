import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PaginatedResponseDto, PaginationQueryDto } from 'src/common/dto';
import { ChallengeService } from './challenge.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { ChallengeResponseDto } from './dto/challenge-response.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';
import { CurrentUser, Roles } from 'src/common/decorators';
import { UserRole } from 'src/common/enums/user-role.enum';
import { UserResponseDto } from 'src/core/auth/dto/auth.dto';
import { ChallengeQueryDto } from './dto/challenge-query.dto';

@ApiTags('Challenges')
@Controller('challenges')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  
  @Get()
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.MEMBER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all challenges with pagination' })
  @ApiResponse({
    status: 200,
    description: 'List of challenges',
    type: PaginatedResponseDto<ChallengeResponseDto>,
  })
  async findAll(@Query() queryDto: ChallengeQueryDto): Promise<PaginatedResponseDto<ChallengeResponseDto>> {
    const filters = {
      search: queryDto.search?.trim() || ''
    };

    const { items, totalCount } = await this.challengeService.findAll(
      filters,
      queryDto.page,
      queryDto.limit,
      queryDto.sortBy,
      queryDto.sortOrder
    );

    return new PaginatedResponseDto(items, totalCount, queryDto.page, queryDto.limit);
  }

  

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Create a new challenge' })
  @ApiBody({ type: CreateChallengeDto })
  @ApiResponse({
    status: 201,
    description: 'Challenge created successfully',
    type: ChallengeResponseDto,
  })
  async create(@Body() dto: CreateChallengeDto, @CurrentUser() user: UserResponseDto): Promise<ChallengeResponseDto> {
    return await this.challengeService.create(dto, user.id);
  }


  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Get a challenge by ID' })
  async findOne(@Param('id') id: string): Promise<ChallengeResponseDto> {
    return await this.challengeService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Update a challenge' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateChallengeDto,
    @CurrentUser() user: UserResponseDto,
  ): Promise<ChallengeResponseDto> {
    return await this.challengeService.update(id, dto, user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'delete a challenge' })
  async remove(@Param('id') id: string, @CurrentUser() user: UserResponseDto): Promise<ChallengeResponseDto> {
    return await this.challengeService.remove(id, user.id);
  }

  @Patch(':id/toggle-active')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Toggle active status of a challenge' })
  async toggleActive(@Param('id') id: string): Promise<ChallengeResponseDto> {
    return await this.challengeService.toggleActive(id);
  }
}
