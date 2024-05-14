import { ApiProperty } from '@nestjs/swagger';
import { AiAliyunOcr } from '../entities/ai-aliyun-ocr.entity';

class AiAliyunOcrPaginatePage {
  @ApiProperty()
    count: number;
  @ApiProperty({ type: [AiAliyunOcr] })
    list: AiAliyunOcr[];
}

export class AiAliyunOcrPaginateResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: AiAliyunOcrPaginatePage })
    data: AiAliyunOcrPaginatePage;
}