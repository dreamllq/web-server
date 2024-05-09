import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetHistoryAiBaiduMessageDto {
  @ApiProperty({ description: 'sessionId' })
  @IsNotEmpty()
  @IsString()
    sessionId:string;
}
