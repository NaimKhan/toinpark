import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateStakingDto {

    @ApiProperty({ example: 'ae4b3f3a-ff12-4cb7-9b1e-b53a6c99a211' })
    @IsNotEmpty({ message: 'ID is required' })
    stakingPackageId: string;

    @ApiProperty({ example: 'bkash, rocket' })
    @IsNotEmpty({ message: 'Payment method is required' })
    paymentMethod: string;

    @ApiProperty({ example: '5000.00' })
    @Type(() => Number)
    @Transform(({ value }) => {
        if (value === null || value === undefined) return 0;
        if (typeof value === 'object' && value.toString) return Number(value.toString());
        return Number(value);
    })
    @Expose()
    @IsNotEmpty({ message: 'toin Amount is required' })
    toinAmount: number;

    @ApiProperty({ example: '100.00' })
    @Type(() => Number)
    @Transform(({ value }) => {
        if (value === null || value === undefined) return 0;
        if (typeof value === 'object' && value.toString) return Number(value.toString());
        return Number(value);
    })
    @IsNotEmpty({ message: 'USD is required' })
    USDAmount: number;
    
}
