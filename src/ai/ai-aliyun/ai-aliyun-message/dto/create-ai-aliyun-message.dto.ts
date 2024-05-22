import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAiAliyunMessageDto {
  @ApiProperty({ description: '消息内容' })
  @IsNotEmpty()
  @IsString()
    content:string;
  
  @ApiProperty({ description: '会话Id' })
  @IsNotEmpty()
  @IsString()
    sessionId:string;
}
