import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUsersDto {

  @ApiProperty({ description: '用户名' })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
    username: string;

  @ApiProperty({ description: '昵称' })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
    nickName: string;

  @ApiProperty({ description: '用户密码' })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
    password: string;

  @ApiProperty()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
    mobile: string;
    
  @ApiProperty()
  @ApiPropertyOptional()
    headimg: string;

  @ApiProperty({ description: '角色列表' })
  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
    roleIds: string[];
}