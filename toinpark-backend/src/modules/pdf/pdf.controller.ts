import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth,  ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard, RolesGuard } from "src/common/guards";
import { UploadService } from "src/common/services/upload.service";
import { EnumSystemSetting } from "src/common/enums/SystemSettings";
import { SystemSettingsService } from '../general_settings/system-settings.service';
import { MediaDto } from "src/core/storage/dto/media.dto";

@ApiTags('Pdf')
@Controller('pdf')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth("JWT-auth")
export class PdfController {
  constructor(private readonly uploadService: UploadService,
              private readonly systemSettingsService: SystemSettingsService  
  ) {}

    @Get()
    @ApiOperation({ summary: 'Get Pdf details' })
    @ApiResponse({
        status: 200,
        description: 'Get Pdf details',
        type: MediaDto,
    })
    async details() {
        const pdfSettings = await this.systemSettingsService.getSetting(EnumSystemSetting.PDF);
        return await this.uploadService.getMediaDetails(pdfSettings.value);
    }


}