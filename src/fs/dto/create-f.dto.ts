import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PathType } from '../constants/path-type';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

class FileDetailDto {
  @ApiProperty()
  @IsString()
    fileId: string;
}
export class CreateFDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
    name: string;

  @ApiProperty()
  @ApiPropertyOptional()
  @IsOptional()
    favorite: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
    parentId: string;

  @ApiProperty({
    description: '路径类型',
    type: 'enum',
    enum: PathType,
    enumName: 'PathType'
  })
  @IsNotEmpty()
  @IsString()
    pathType: PathType;

  @ApiProperty({ type: FileDetailDto })
  @ApiPropertyOptional()
  @IsOptional()
    fileDetail:FileDetailDto;
}
