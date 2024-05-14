import { ApiProperty } from '@nestjs/swagger';
import { AiAliyunAccount } from '../entities/ai-aliyun-account.entity';

class AiAliyunAccountPaginatePage {
  @ApiProperty()
    count: number;
  @ApiProperty({ type: [AiAliyunAccount] })
    list: AiAliyunAccount[];
}

export class AiAliyunAccountPaginateResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: AiAliyunAccountPaginatePage })
    data: AiAliyunAccountPaginatePage;
}