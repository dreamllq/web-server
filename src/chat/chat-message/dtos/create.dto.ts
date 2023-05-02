import { ApiProperty } from '@nestjs/swagger';
import { ChatMessageTypeEnum } from '../chat-message.type';

export class ChatMessageCreateDto {
  @ApiProperty()
    id: string;
  @ApiProperty({ enum: ChatMessageTypeEnum })
    type: ChatMessageTypeEnum;
  @ApiProperty()
    content: string;
  @ApiProperty()
    contactsId: string;
}