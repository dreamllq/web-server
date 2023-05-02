import { ApiProperty } from '@nestjs/swagger';
import { ChatContactsTypeEnum } from '../chat-contacts.type';

export class ChatContactsUpdateDto {
  @ApiProperty({ enum: ChatContactsTypeEnum })
    status: ChatContactsTypeEnum;
}