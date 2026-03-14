// src/notifications/dto/create-notification.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsObject, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { PaginationQueryDto } from 'src/common/dto';
import { NotificationType } from '@prisma/client';
import { DefaultSortField } from 'src/common/enums/default-sort-field.enum';



export class CreateNotificationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ enum: NotificationType })
  @IsEnum(NotificationType)
  type: NotificationType;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  data?: Record<string, any>;
}

// update notification dto
export class UpdateNotificationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isRead?: boolean;
}


export class NotificationResponseDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  userId: string;

  @Expose()
  @ApiProperty({ enum: NotificationType })
  type: NotificationType;

  @Expose()
  @ApiProperty()
  title: string;

  @Expose()
  @ApiProperty()
  message: string;

  @Expose()
  @ApiPropertyOptional()
  data?: Record<string, any>;

  @Expose()
  @ApiProperty()
  isRead: boolean;

  @Expose()
  @ApiPropertyOptional()
  readAt?: Date;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;
}


export class QueryNotificationsDto extends PaginationQueryDto {

  @ApiPropertyOptional({ enum: DefaultSortField, default: DefaultSortField.CREATED_AT })
  @IsOptional()
  @IsEnum(DefaultSortField)
  sortBy?: DefaultSortField = DefaultSortField.CREATED_AT

  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return null;
  })
  isUnread?: boolean | null;
}

