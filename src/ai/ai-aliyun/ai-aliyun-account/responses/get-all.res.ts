import { ApiProperty } from '@nestjs/swagger';
import { AiAliyunAccount } from '../entities/ai-aliyun-account.entity';

export class AiAliyunAccountGetAllResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: [AiAliyunAccount] })
    data: AiAliyunAccount[];
}