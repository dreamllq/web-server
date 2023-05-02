import { ApiProperty } from '@nestjs/swagger';
import { ChatContacts } from '../chat-contacts.entity';

export class ChatContactsGetResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: [ChatContacts] })
    data: ChatContacts[];
}