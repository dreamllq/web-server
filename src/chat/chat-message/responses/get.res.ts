import { ApiProperty } from '@nestjs/swagger';
import { ChatMessage } from '../chat-message.entity';

export class ChatMessageGetResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: [ChatMessage] })
    data: ChatMessage[];
}