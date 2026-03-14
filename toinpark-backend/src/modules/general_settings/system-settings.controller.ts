import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { SystemSettingsService } from './system-settings.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';
import { UserRole } from 'src/common/enums/user-role.enum';
import { Roles } from 'src/common/decorators';
import { SettingItemDto, SettingsResponseDto } from './dto/system-settings.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UpdateSettingsDto } from './dto/update-system-settings.dto';
import { UserResponseDto } from 'src/core/auth/dto/auth.dto';
import { ValidationException } from 'src/common/exceptions';
import { UpdateSingleSettingDto } from './dto/update-single-setting.dto';
import { EnumSystemSetting } from 'src/common/enums/SystemSettings';
import { UploadService } from 'src/common/services/upload.service';


@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('System Settings')
@Controller('system-settings')
export class SystemSettingsController {
    constructor(private readonly systemSettingsService : SystemSettingsService,
                private readonly uploadService : UploadService
    ) {}


    @Get()
    @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
    @ApiOperation({ summary: 'Get all system settings'})
    @ApiResponse({
        status: 200,
        description: 'Settings retrieved successfully',
        type: SettingsResponseDto,
    })
    async getSettings(): Promise<SettingsResponseDto> {
        return await this.systemSettingsService.getAllSettings();
    }


    @Get('array')
    @HttpCode(HttpStatus.OK)
    @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
    @ApiOperation({ summary: 'Get all settings as array' })
    @ApiResponse({
        status: 200,
        description: 'Settings array retrieved successfully',
        type: [SettingItemDto],
    })
    async getAllSettingsArray(
    ): Promise<SettingItemDto[]> {
        return await this.systemSettingsService.getAllSettingsArray();
    }


    @Get(':key')
    @Roles(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPERADMIN)
    @ApiOperation({ summary: 'Get single setting by key' })
    @ApiResponse({ type: SettingItemDto })
    async getSettingByKey(@Param('key') key: EnumSystemSetting): Promise<SettingItemDto> {
        return await this.systemSettingsService.getSetting(key);
    }


    @Patch()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @ApiBearerAuth('JWT-auth')
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'favicon', maxCount: 1 },
            { name: 'logo', maxCount: 1 },
            { name: 'pdf', maxCount: 1 },
        ]),
    )
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Update multiple settings at once (with file uploads)' })
    @ApiBody({ type: UpdateSettingsDto })
    @ApiResponse({
        status: 200,
        description: 'Settings updated successfully',
        type: SettingsResponseDto,
    })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 422, description: 'Validation error' })
    async updateSettings(
        @Body() dto: UpdateSettingsDto,
        @UploadedFiles()
        files?: {
            favicon?: Express.Multer.File[];
            logo?: Express.Multer.File[];
            pdf?: Express.Multer.File[];
        }
    ): Promise<SettingsResponseDto> {

        const logoFile = files?.logo?.[0];
        const faviconFile = files?.favicon?.[0];
        const pdfFile = files?.pdf?.[0];


        // Validate favicon file if uploaded
        if (faviconFile) {
            const maxSize = 2 * 1024 * 1024; // 2MB
            const allowedTypes = ['image/x-icon', 'image/vnd.microsoft.icon', 'image/png', 'image/svg+xml'];

            if (faviconFile.size > maxSize) {
                throw new ValidationException({
                    favicon: ['Favicon file size must not exceed 2MB'],
                });
            }

            if (!allowedTypes.includes(faviconFile.mimetype)) {
                throw new ValidationException({
                    favicon: ['Favicon must be ico, png, or svg format'],
                });
            }
        }

        // Validate logo file if uploaded
        if (logoFile) {
            const maxSize = 2 * 1024 * 1024; // 2MB
            const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/webp'];

            if (logoFile.size > maxSize) {
                throw new ValidationException({
                    logo: ['Logo file size must not exceed 2MB'],
                });
            }

            if (!allowedTypes.includes(logoFile.mimetype)) {
                throw new ValidationException({
                    logo: ['Logo must be png, jpg, svg, or webp format'],
                });
            }
        }

        // Validate pdf file if uploaded
        if (pdfFile) {
            const maxSize = 10 * 1024 * 1024; // 10MB
            const allowedTypes = ['application/pdf'];

            if (pdfFile.size > maxSize) {
                throw new ValidationException({
                    pdf: ['Pdf file size must not exceed 10MB'],
                });
            }

            if (!allowedTypes.includes(pdfFile.mimetype)) {
                throw new ValidationException({
                    pdf: ['pdf must be application/pdf format'],
                });
            }
        }

        let logoPath: string | undefined;
        let faviconPath: string | undefined;
        let pdfPath: string | undefined;


        // Upload new logo file if provided
        if (logoFile) {
            logoPath = await this.uploadService.uploadLogo(logoFile);
        }

        // Upload new favicon if provided
        if (faviconFile) {
            faviconPath = await this.uploadService.uploadFavicon(faviconFile);
        }

         // Upload new pdf if provided
        if (pdfFile) {
            pdfPath = await this.uploadService.uploadPdf(pdfFile);
        }

        return await this.systemSettingsService.updateSettings(dto, logoPath, faviconPath, pdfPath);
    }


    @Patch('single')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @ApiBearerAuth('JWT-auth')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Update single setting (text only)' })
    @ApiBody({ type: UpdateSingleSettingDto })
    @ApiResponse({
        status: 200,
        description: 'Setting updated successfully',
        type: SettingItemDto,
    })
    async updateSingleSetting(
        @Body() dto: UpdateSingleSettingDto
    ): Promise<SettingItemDto> {
        return await this.systemSettingsService.updateSingleSetting(dto);
    }



    @Post('reset')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
    @ApiBearerAuth('JWT-auth')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Reset all settings to default values' })
    @ApiResponse({
        status: 200,
        description: 'Settings reset successfully',
        type: SettingsResponseDto,
    })
    async resetToDefaults(): Promise<SettingsResponseDto> {
        return await this.systemSettingsService.resetToDefaults();
    }

}