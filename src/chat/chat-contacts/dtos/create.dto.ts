import { ApiProperty } from '@nestjs/swagger';

export class ChatContactsCreateDto {
  @ApiProperty()
    contactsId: string;
}