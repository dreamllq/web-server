import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAiBaiduAccountDto {
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
}
