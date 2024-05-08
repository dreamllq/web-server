import { ApiProperty } from '@nestjs/swagger';
import { AiBaiduSession } from '../entities/ai-baidu-session.entity';

export class AiBaiduSessionGetResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: AiBaiduSession })
    data: AiBaiduSession;
}