import { ApiProperty } from '@nestjs/swagger';
import { ChatSession } from '../chat-session.entity';

export class ChatSessionCreateResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: ChatSession })
    data: ChatSession;
}