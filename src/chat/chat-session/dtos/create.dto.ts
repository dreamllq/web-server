import { ApiProperty } from '@nestjs/swagger';

export class ChatSessionCreateDto {
  @ApiProperty()
    contactsId: string;
}