import { ApiProperty } from '@nestjs/swagger';
import { AiBaiduAccount } from '../entities/ai-baidu-account.entity';

export class AiBaiduAccountGetResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: AiBaiduAccount })
    data: AiBaiduAccount;
}