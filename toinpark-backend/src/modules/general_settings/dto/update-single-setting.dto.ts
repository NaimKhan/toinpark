import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { EnumSystemSetting } from 'src/common/enums/SystemSettings';


export class UpdateSingleSettingDto {
  @ApiProperty({
    description: 'Setting key',
    enum: EnumSystemSetting,
    example: EnumSystemSetting.SITE_TITLE,
  })
  @IsEnum(EnumSystemSetting, { message: 'Invalid setting key' })
  @IsNotEmpty()
  key: EnumSystemSetting;

  @ApiProperty({
    description: 'Setting value',
    example: 'My New Site Title',
  })
  @IsString()
  @IsNotEmpty({ message: 'Value is required' })
  value: string;
}