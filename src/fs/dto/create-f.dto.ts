import { ApiProperty } from '@nestjs/swagger';
import { PathType } from '../constants/path-type';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
    name: string;

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

  @ApiProperty()
    fileDetail:{fileId: string};
}
