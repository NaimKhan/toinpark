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
import { AirDropEventService } from './airdrop-event.service';
import { CreateAirDropEventDto } from './dto/create-airdrop-event.dto';
import { UpdateAirDropEventDto } from './dto/update-airdrop-event.dto';
import { AirDropEventResponseDto } from './dto/airdrop-event-response.dto';
import { CurrentUser, Roles } from 'src/common/decorators';
import { UserRole } from 'src/common/enums/user-role.enum';
import { UserResponseDto } from 'src/core/auth/dto/auth.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('Admin - Airdrop Events')
@Controller('airdrop-events')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class AirdropEventController {
  constructor(private readonly airDropEventService: AirDropEventService) {}

  @Get()
  @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all Airdrop events with pagination' })
  @ApiResponse({
    status: 200,
    description: 'List of Airdrop events',
    type: PaginatedResponseDto<AirDropEventResponseDto>,
  })
  async findAll(
    @Query() paginationDto: PaginationQueryDto,
  ): Promise<PaginatedResponseDto<AirDropEventResponseDto>> {
    const filters = {
      search: paginationDto.search?.trim() || '',
    };

    const { items, totalCount } = await this.airDropEventService.findAll(
      filters,
      paginationDto.page,
      paginationDto.limit,
    );

    return new PaginatedResponseDto<AirDropEventResponseDto>(
      items,
      totalCount,
      paginationDto.page,
      paginationDto.limit,
    );
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new Airdrop event' })
  @ApiBody({ type: CreateAirDropEventDto })
  @ApiResponse({
    status: 201,
    description: 'Airdrop event created successfully',
    type: AirDropEventResponseDto,
  })
  @ApiResponse({ status: 409, description: 'Event name already exists' })
  async create(
    @Body() createDto: CreateAirDropEventDto,
    @CurrentUser() user: UserResponseDto,
  ): Promise<AirDropEventResponseDto> {
    return await this.airDropEventService.create(createDto, user.id);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get an Airdrop event by ID' })
  @ApiResponse({
    status: 200,
    description: 'Airdrop event found',
    type: AirDropEventResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Airdrop event not found' })
  async findOne(@Param('id') id: string): Promise<AirDropEventResponseDto> {
    return await this.airDropEventService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update an Airdrop event' })
  @ApiResponse({
    status: 200,
    description: 'Airdrop event updated successfully',
    type: AirDropEventResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Airdrop event not found' })
  @ApiResponse({ status: 409, description: 'Event name already exists' })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateAirDropEventDto,
    @CurrentUser() user: UserResponseDto,
  ): Promise<AirDropEventResponseDto> {
    return await this.airDropEventService.update(id, updateDto, user.id);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft delete an Airdrop event' })
  @ApiResponse({
    status: 200,
    description: 'Airdrop event deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Airdrop event not found' })
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: UserResponseDto,
  ): Promise<AirDropEventResponseDto> {
    return await this.airDropEventService.remove(id, user.id);
  }

  @Patch(':id/toggle-active')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Toggle active status of an Airdrop event' })
  @ApiResponse({
    status: 200,
    description: 'Active status toggled successfully',
    type: AirDropEventResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Airdrop event not found' })
  async toggleActive(
    @Param('id') id: string,
  ): Promise<AirDropEventResponseDto> {
    return await this.airDropEventService.toggleActive(id);
  }
}
