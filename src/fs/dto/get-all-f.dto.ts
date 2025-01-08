import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';


export class GetAllFDto {
  @ApiProperty()
  @ApiPropertyOptional()
  @IsOptional()
    favorite: 'true' | 'false';
}