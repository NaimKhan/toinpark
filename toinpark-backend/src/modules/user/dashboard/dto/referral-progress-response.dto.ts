import { ApiProperty } from "@nestjs/swagger";

export class ReferralProgressResponseDto {
    @ApiProperty({ example: 'Bronze' })
    milestone: string;

    @ApiProperty({ example: 3 })
    totalRefer: number;

    @ApiProperty({ example: 1 })
    progress: number;

    @ApiProperty({ example: 3 })
    targetPerson: number;

    @ApiProperty({ example: '1/3' })
    display: string;
}
