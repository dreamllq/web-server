import { ApiProperty } from '@nestjs/swagger';
import { AiAliyunService } from '../entities/ai-aliyun-service.entity';

export class AiAliyunServiceGetResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: AiAliyunService })
    data: AiAliyunService;
}