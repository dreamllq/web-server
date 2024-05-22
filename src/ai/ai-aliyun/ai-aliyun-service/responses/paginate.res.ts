import { ApiProperty } from '@nestjs/swagger';
import { AiAliyunService } from '../entities/ai-aliyun-service.entity';

class AiAliyunServicePaginatePage {
  @ApiProperty()
    count: number;
  @ApiProperty({ type: [AiAliyunService] })
    list: AiAliyunService[];
}

export class AiAliyunServicePaginateResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: AiAliyunServicePaginatePage })
    data: AiAliyunServicePaginatePage;
}