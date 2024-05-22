import { ApiProperty } from '@nestjs/swagger';
import { AiAliyunMessage } from '../entities/ai-aliyun-message.entity';

export class AiAliyunAccountGetHistoryResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: [AiAliyunMessage] })
    data: AiAliyunMessage[];
}