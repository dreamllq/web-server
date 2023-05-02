import { ApiOperation, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UserUpdateDto {
  @ApiProperty({ description: '角色列表' })
  @IsArray()
    roleIds: string[];

  @ApiPropertyOptional()
  @ApiProperty()
  @IsOptional()
  @IsString()
    username:string;

  @ApiPropertyOptional()
  @ApiProperty()
  @IsOptional()
  @IsString()
    nickName: string;

  @ApiPropertyOptional()
  @ApiProperty()
  @IsOptional()
  @IsString()
    mobile: string;
  
  @ApiProperty()
  @ApiPropertyOptional()
    headimg: string;
}