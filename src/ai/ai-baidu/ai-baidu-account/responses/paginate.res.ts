import { ApiProperty } from '@nestjs/swagger';
import { AiBaiduAccount } from '../entities/ai-baidu-account.entity';

class AiBaiduAccountPaginatePage {
  @ApiProperty()
    count: number;
  @ApiProperty({ type: [AiBaiduAccount] })
    list: AiBaiduAccount[];
}

export class AiBaiduAccountPaginateResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: AiBaiduAccountPaginatePage })
    data: AiBaiduAccountPaginatePage;
}