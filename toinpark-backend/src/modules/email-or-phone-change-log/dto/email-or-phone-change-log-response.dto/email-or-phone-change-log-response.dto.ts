import { ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { PaginationQueryDto } from "src/common/dto";
import { EmailOrPhoneChangeLogChangeType, EmailOrPhoneChangeLogSortField } from "./email-or-phone-enum";

export class EmailOrPhoneChangeLogRequestDto extends PaginationQueryDto {

    @ApiPropertyOptional({ enum: EmailOrPhoneChangeLogSortField, default: EmailOrPhoneChangeLogSortField.CREATED_AT })
    @IsOptional()
    @IsEnum(EmailOrPhoneChangeLogSortField)
    sortBy?: EmailOrPhoneChangeLogSortField = EmailOrPhoneChangeLogSortField.CREATED_AT

    @ApiPropertyOptional({
        description: 'Filter by Change type',
        enum: EmailOrPhoneChangeLogChangeType,
        example: EmailOrPhoneChangeLogChangeType.STATED,
    })
    @IsOptional()
    @IsEnum(EmailOrPhoneChangeLogChangeType)
    changeType?: EmailOrPhoneChangeLogChangeType;

    @ApiPropertyOptional({
        description: 'Filter by User ID',
        example: 'uuid-here',
    })
    @IsOptional()
    @IsString()
    userId?: string;
}


export class EmailOrPhoneChangeLogResponseDto {
    @Expose() id: string;
    @Expose() logId: number;
    @Expose() userId: string;
    @Expose() userName?: string | null;
    @Expose() fullName?: string | null;
    @Expose() changeType?: EmailOrPhoneChangeLogChangeType | null;
    @Expose() verifiedAt?: Date | null;
    @Expose() requestedAt?: Date | null;
    @Expose() oldValue?: string | null;
    @Expose() newValue?: string | null;
    @Expose() remarks?: string | null;
    @Expose() createdAt?: Date;
    @Expose() createdBy?: string | null;
    @Expose() updatedAt?: Date | null;
    @Expose() updatedBy?: string | null;
    @Expose() deletedAt?: Date | null;
    @Expose() deletedBy?: string | null;

}
