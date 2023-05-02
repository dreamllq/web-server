import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FindDirectionEnum } from '../chat-message.type';

export class ChatMessageGetDto {
  @ApiProperty()
    contactsId: string;
  @ApiPropertyOptional()
  @ApiProperty()
    fromId: string;
  @ApiProperty({ enum: FindDirectionEnum })
    direction: FindDirectionEnum;
}