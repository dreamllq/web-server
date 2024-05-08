import { ApiProperty } from '@nestjs/swagger';
import { AiBaiduSession } from '../entities/ai-baidu-session.entity';

class AiBaiduSessionPaginatePage {
  @ApiProperty()
    count: number;
  @ApiProperty({ type: [AiBaiduSession] })
    list: AiBaiduSession[];
}

export class AiBaiduSessionPaginateResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: AiBaiduSessionPaginatePage })
    data: AiBaiduSessionPaginatePage;
}