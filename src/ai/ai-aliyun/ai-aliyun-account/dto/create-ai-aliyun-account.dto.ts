import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAiAliyunAccountDto {
  @ApiProperty({ description: '名称' })
  @IsNotEmpty()
  @IsString()
    name:string;

  @ApiProperty({ description: 'Access Key' })
  @IsNotEmpty()
  @IsString()
    accessKey:string;

  @ApiProperty({ description: 'Secret Key' })
  @IsNotEmpty()
  @IsString()
    secretKey:string;

  @ApiPropertyOptional()
  @ApiProperty({ description: 'Secret Key' })
  @IsOptional()
  @IsString()
    dashscopeApiKey: string;
}
