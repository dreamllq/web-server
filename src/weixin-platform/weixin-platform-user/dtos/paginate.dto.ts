import { ApiProperty } from '@nestjs/swagger';

export class WeixinPlatformUserPaginateDto {
  @ApiProperty()
    pageNo: number;
  @ApiProperty()
    pageSize: number;
  @ApiProperty()
    weixinId: string;
}