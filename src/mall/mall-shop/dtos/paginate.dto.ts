import { ApiProperty } from '@nestjs/swagger';

export class MallShopPaginateDto {
  @ApiProperty()
    pageNo: number;
  @ApiProperty()
    pageSize: number;
  @ApiProperty()
    name: string;
}