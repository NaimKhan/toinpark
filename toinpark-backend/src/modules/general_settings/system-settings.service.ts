import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { SettingItemDto, SettingsResponseDto } from './dto/system-settings.dto';
import { UpdateSettingsDto } from './dto/update-system-settings.dto';
import { UpdateSingleSettingDto } from './dto/update-single-setting.dto';
import { EnumSystemSetting } from 'src/common/enums/SystemSettings';
import { string } from 'zod';
import { UploadService } from 'src/common/services/upload.service';

@Injectable()
export class SystemSettingsService {
  constructor(private readonly prisma: PrismaService,
              private readonly uploadService: UploadService
  ) {}

  /**
   * Get all settings as a key-value object
   */
  async getAllSettings(): Promise<SettingsResponseDto> {
    const settings = await this.prisma.systemSetting.findMany({
      orderBy: { order: 'asc' },
    });

    const settingsObject: any = {};

    for(const setting of settings)
    {
      if (setting.key === EnumSystemSetting.TOIN_CONVENTION_RATE) {
        settingsObject[setting.key] = parseFloat(setting.value);
      } 
      else if (setting.key === EnumSystemSetting.LOGO) {
        settingsObject[setting.key] = setting.value; // Keep original value
        settingsObject['logoMedia'] = await this.uploadService.getMediaDetails(setting.value);
      }
      else if (setting.key === EnumSystemSetting.FAVICON) {
        settingsObject[setting.key] = setting.value; // Keep original value
        settingsObject['faviconMedia'] = await this.uploadService.getMediaDetails(setting.value);
      }
      else if (setting.key === EnumSystemSetting.PDF) {
        settingsObject[setting.key] = setting.value; // Keep original value
        settingsObject['pdfMedia'] = await this.uploadService.getMediaDetails(setting.value);
      }
      else {
        settingsObject[setting.key] = setting.value;
      }
    }

    return plainToInstance(SettingsResponseDto, settingsObject, {
      excludeExtraneousValues: true,
    });
  }


  /**
   * Get all settings as array
   */
  async getAllSettingsArray(): Promise<SettingItemDto[]> {
    const settings = await this.prisma.systemSetting.findMany({
      orderBy: { order: 'asc' },
    });

    return plainToInstance(SettingItemDto, settings, {
      excludeExtraneousValues: true,
    });
  }

  /**
   * Get single setting by key
   */
  async getSetting(key: EnumSystemSetting): Promise<SettingItemDto> {
    const setting = await this.prisma.systemSetting.findUnique({
      where: { key },
    });

    if (!setting) {
      throw new NotFoundException(`Setting with key '${key}' not found`);
    }

    return plainToInstance(SettingItemDto, setting, {
      excludeExtraneousValues: true,
    });
  }


  /**
   * Update multiple settings at once (with file uploads)
   */
  async updateSettings(
    dto: UpdateSettingsDto,
    logoPath?: string,
    faviconPath?: string,
    pdfPath?: string
  ): Promise<SettingsResponseDto> {
    
    const updates = [];

    // Handle logo file upload
    if (logoPath) {
      updates.push(
        this.prisma.systemSetting.update({
          where: { key: EnumSystemSetting.LOGO },
          data: {
            value: logoPath,
            updatedAt: new Date(),
          },
        }),
      );
    }

    // Handle favicon file upload
    if (faviconPath) {
      updates.push(
        this.prisma.systemSetting.update({
          where: { key: EnumSystemSetting.FAVICON },
          data: {
            value: faviconPath,
            updatedAt: new Date()
          },
        }),
      );
    }


    // Handle favicon file upload
    if (pdfPath) {
      updates.push(
        this.prisma.systemSetting.upsert({
            where: { key: EnumSystemSetting.PDF },
            update: {
              value: pdfPath,
              updatedAt: new Date(),
            },
            create: {
              key: EnumSystemSetting.PDF,
              value: pdfPath,
              createdAt: new Date()
            },
          }),
      );
    }

    // Handle other text fields
    const textFields: (keyof UpdateSettingsDto)[] = [
      'toinConventionRate',
      'whatsApp',
      'organizationName',
      'organizationEmail',
      'telegram',
      'siteTitle',
      'airdropEventMessage',
      'entryBonusToin',
      'kycBonusToin',
      'socialBonusToin',
      'facebookUrl',
      'youtubeUrl',
      'linkedinUrl',
      'instagramUrl',
      'minUSDTWithdrawalAmount',
      'platformWithdrawalFeePercentage'
    ];

    textFields.forEach((field) => {
      const value = dto[field];
      if (value !== undefined) {
        updates.push(
          this.prisma.systemSetting.upsert({
            where: { key: field },
            update: {
              value: value.toString(),
              updatedAt: new Date(),
            },
            create: {
              key: field,
              value: value.toString(),
              createdAt: new Date()
            },
          }),
        );
      }
    });

    // Execute all updates in transaction
    if (updates.length > 0) {
      await this.prisma.$transaction(updates);
    }

    return await this.getAllSettings();
  }
  
  
/**
 * Update single setting
 */
  async updateSingleSetting(
    dto: UpdateSingleSettingDto
  ): Promise<SettingItemDto> {

    const setting = await this.prisma.systemSetting.update({
      where: { key: dto.key },
      data: {
        value: dto.value,
        updatedAt: new Date()
      },
    });

    return plainToInstance(SettingItemDto, setting, {
      excludeExtraneousValues: true,
    });
  }



  /**
   * Reset all settings to default
   */
  async resetToDefaults(): Promise<SettingsResponseDto> {
    const defaultSettings = [
      { key: EnumSystemSetting.TOIN_CONVENTION_RATE, value: '0.01' },
      { key: EnumSystemSetting.FAVICON, value: 'favicon.ico' },
      { key: EnumSystemSetting.LOGO, value: 'logo.ico' },
      { key: EnumSystemSetting.WHATSAPP, value: '+8801756307427' },
      { key: EnumSystemSetting.ORGANIZATION_NAME, value: 'TOIN Park' },
      { key: EnumSystemSetting.ORGANIZATION_EMAIL, value: 'info@toilabs.com' },
      { key: EnumSystemSetting.TELEGRAM, value: '+8801756307427' },
      { key: EnumSystemSetting.SITE_TITLE, value: 'ToinPark' },
      {
        key: EnumSystemSetting.AIRDROP_EVENT_MESSAGE,
        value: 'Join our airdrop event to win exciting prizes!',
      },
      { key: EnumSystemSetting.MIN_USDT_WITHDRAWAL_AMOUNT, value: '10' },
      { key: EnumSystemSetting.PLATFORM_WITHDRAWAL_FEE_PERCENTAGE, value: '1' },
    ];

    const updates = defaultSettings.map((setting) =>
      this.prisma.systemSetting.update({
        where: { key: setting.key },
        data: { value: setting.value, updatedAt: new Date() },
      }),
    );

    await this.prisma.$transaction(updates);

    return await this.getAllSettings();
  }

  // Delete single setting
  async deleteSetting(key: string) {
    return this.prisma.systemSetting.delete({
      where: { key },
    });
  }

  // Delete all settings
  async deleteAll() {
    return this.prisma.systemSetting.deleteMany();
  }
}