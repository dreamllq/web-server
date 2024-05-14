import { ApiProperty } from '@nestjs/swagger';
import { AiAliyunOcr } from '../entities/ai-aliyun-ocr.entity';

export class AiAliyunOcrGetResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: AiAliyunOcr })
    data: AiAliyunOcr;
}