import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { TutorialCategoryService } from './tutorial-category.service';
import { CreateTutorialCategoryDto } from './dto/create-tutorial-category.dto';
import { UpdateTutorialCategoryDto } from './dto/update-tutorial-category.dto';
import { TutorialCategoryResponseDto } from './dto/tutorial-category-response.dto';
import { PaginatedResponseDto, PaginationQueryDto } from 'src/common/dto';
import { CurrentUser, Roles } from 'src/common/decorators';
import { UserRole } from 'src/common/enums/user-role.enum';
import { UserResponseDto } from 'src/core/auth/dto/auth.dto';
import { TutorialCategoryQueryDto } from './dto/tutorial-category-query.dto';

@ApiTags('Tutorial Categories')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
@Controller('tutorial-categories')
export class TutorialCategoryController {
  constructor(private readonly tutorialCategoryService: TutorialCategoryService) {}

  @Get()
  @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all tutorial categories' })
  @ApiResponse({
    status: 200,
    description: 'List of tutorial categories',
    type: PaginatedResponseDto<TutorialCategoryResponseDto>,
  })
  async findAll(@Query() paginationDto: TutorialCategoryQueryDto): Promise<PaginatedResponseDto<TutorialCategoryResponseDto>> {
    const filters = {
      search: paginationDto.search?.trim() || '',
    };

    const { items, totalCount } = await this.tutorialCategoryService.findAll(
      filters,
      paginationDto.page,
      paginationDto.limit,
      paginationDto.sortBy,
      paginationDto.sortOrder
    );

    return new PaginatedResponseDto<TutorialCategoryResponseDto>(
      items,
      totalCount,
      paginationDto.page,
      paginationDto.limit,
    );
  }


  @Post()
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new tutorial category' })
  @ApiResponse({
    status: 201,
    description: 'Tutorial category created successfully',
    type: TutorialCategoryResponseDto,
  })
  @ApiResponse({ status: 409, description: 'Category name already exists' })
  async create(@Body() createDto: CreateTutorialCategoryDto): Promise<TutorialCategoryResponseDto> {
    return await this.tutorialCategoryService.create(createDto);
  }

  

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a tutorial category by ID' })
  @ApiResponse({
    status: 200,
    description: 'Tutorial category found',
    type: TutorialCategoryResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Tutorial category not found' })
  async findOne(@Param('id') id: string): Promise<TutorialCategoryResponseDto> {
    return await this.tutorialCategoryService.findOne(id);
  }


  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a tutorial category' })
  @ApiResponse({
    status: 200,
    description: 'Tutorial category updated successfully',
    type: TutorialCategoryResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Tutorial category not found' })
  @ApiResponse({ status: 409, description: 'Category name already exists' })
  async update(@Param('id') id: string, @Body() updateDto: UpdateTutorialCategoryDto): Promise<TutorialCategoryResponseDto> {
    return await this.tutorialCategoryService.update(id, updateDto);
  }


  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft delete a tutorial category' })
  @ApiResponse({
    status: 200,
    description: 'Tutorial category deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Tutorial category not found' })
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: UserResponseDto,
  ): Promise<TutorialCategoryResponseDto> {
    return await this.tutorialCategoryService.remove(id, user.id);
  }


  @Patch(':id/toggle-active')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Toggle active status of a tutorial category' })
  @ApiResponse({
    status: 200,
    description: 'Active status toggled successfully',
    type: TutorialCategoryResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Tutorial category not found' })
  async toggleActive(@Param('id') id: string): Promise<TutorialCategoryResponseDto> {
    return await this.tutorialCategoryService.toggleActive(id);
  }
}
