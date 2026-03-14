import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { TransactionStatus, TransactionType } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PaginationQueryDto } from "src/common/dto/pagination.dto";
import { TransactionSortField } from "./transaction-sort-field.enum";

export class TransctionQueryDto extends PaginationQueryDto {

    @ApiPropertyOptional({ enum: TransactionSortField, default: TransactionSortField.CREATED_AT })
    @IsOptional()
    @IsEnum(TransactionSortField)
    sortBy?: TransactionSortField = TransactionSortField.CREATED_AT

    @ApiPropertyOptional({
        description: 'Filter by Transaction type',
        enum: TransactionType,
        example: TransactionType.ENTRY_BONUS,
    })
    @IsOptional()
    @IsEnum(TransactionType)
    trxType?: TransactionType;

    @ApiPropertyOptional({
        description: 'Filter by Transaction Statuus',
        enum: TransactionStatus,
        example: TransactionStatus.PENDING,
    })
    @IsOptional()
    @IsEnum(TransactionStatus)
    trxStatus?: TransactionStatus;

    @ApiPropertyOptional({
        description: 'Filter by User ID',
        example: 'uuid-here',
    })
    @IsOptional()
    @IsString()
    userId?: string;

}


export class MemberTransctionQueryDto extends PaginationQueryDto {

    @ApiPropertyOptional({ enum: TransactionSortField, default: TransactionSortField.CREATED_AT })
    @IsOptional()
    @IsEnum(TransactionSortField)
    sortBy?: TransactionSortField = TransactionSortField.CREATED_AT


    @ApiPropertyOptional({
        description: 'Filter by Transaction type',
        enum: TransactionType,
        example: TransactionType.ENTRY_BONUS,
    })
    @IsOptional()
    @IsEnum(TransactionType)
    trxType?: TransactionType;

    @ApiPropertyOptional({
        description: 'Filter by Transaction Status',
        enum: TransactionStatus,
        example: TransactionStatus.PENDING,
    })
    @IsOptional()
    @IsEnum(TransactionStatus)
    trxStatus?: TransactionStatus;

    @ApiPropertyOptional({
        description: 'Filter by Transaction Level ID',
        example: '979hikhkjh',
    })
    @IsOptional()
    @IsString()
    levelId?: string;

}


export class AdminTransctionQueryDto extends MemberTransctionQueryDto {

    @ApiProperty({
        description: 'Filter by User ID',
        example: 'uuid-here',
    })
    @IsNotEmpty()
    @IsString()
    userId: string;

}