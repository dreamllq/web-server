import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRolesDto {
  @ApiProperty({ description: '角色名称' })
  @IsNotEmpty()
  @IsString()
    name:string;

  @ApiPropertyOptional()
  @ApiProperty({ description: '角色描述' })
  @IsOptional()
  @IsString()
    desc:string;


  @ApiProperty({ description: '角色关联资源id列表' })
  @IsArray()
    resourceIds: string[];
}