import { ApiProperty } from '@nestjs/swagger';
import { AiAliyunSession } from '../entities/ai-aliyun-session.entity';

export class AiAliyunSessionGetResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: AiAliyunSession })
    data: AiAliyunSession;
}