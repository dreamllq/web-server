import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ForumSectionUpdateDto {
  @ApiProperty()
  @IsString()
    name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
    desc: string;
}