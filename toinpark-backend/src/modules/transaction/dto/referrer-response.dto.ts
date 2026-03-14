import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class ReferrerResponseDto {
  @Expose()
  @ApiProperty()
  username: string;

} 