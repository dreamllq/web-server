import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ForumSectionCreateDto {
  @ApiProperty()
  @IsString()
    name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
    desc: string;
}