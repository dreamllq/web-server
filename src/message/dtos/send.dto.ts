import { ApiProperty } from '@nestjs/swagger';

export class MessageSendDto {
  @ApiProperty()
    from: string;
  @ApiProperty()
    to: string;
  @ApiProperty()
    content: string;
  @ApiProperty()
    namespace: string;
}