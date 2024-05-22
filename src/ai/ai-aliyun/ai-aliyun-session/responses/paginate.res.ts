import { ApiProperty } from '@nestjs/swagger';
import { AiAliyunSession } from '../entities/ai-aliyun-session.entity';

class AiAliyunSessionPaginatePage {
  @ApiProperty()
    count: number;
  @ApiProperty({ type: [AiAliyunSession] })
    list: AiAliyunSession[];
}

export class AiAliyunSessionPaginateResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: AiAliyunSessionPaginatePage })
    data: AiAliyunSessionPaginatePage;
}