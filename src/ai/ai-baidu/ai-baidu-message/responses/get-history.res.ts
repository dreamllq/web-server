import { ApiProperty } from '@nestjs/swagger';
import { AiBaiduMessage } from '../entities/ai-baidu-message.entity';

export class AiBaiduAccountGetHistoryResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: [AiBaiduMessage] })
    data: AiBaiduMessage[];
}