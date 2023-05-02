import { ApiProperty } from '@nestjs/swagger';

export class MallGoodGetAllDto {
  @ApiProperty()
    shopId: string;
}