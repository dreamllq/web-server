import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateRoleDto {

  @ApiPropertyOptional()
  @ApiProperty({ description: '角色描述' })
  @IsOptional()
  @IsString()
    desc:string;


  @ApiProperty({ description: '角色关联资源id列表' })
  @IsArray()
    resourceIds: string[];
}