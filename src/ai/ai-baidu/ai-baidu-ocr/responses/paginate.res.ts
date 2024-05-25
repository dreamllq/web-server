import { ApiProperty } from '@nestjs/swagger';
import { AiBaiduOcr } from '../entities/ai-baidu-ocr.entity';

class AiBaiduOcrPaginatePage {
  @ApiProperty()
    count: number;
  @ApiProperty({ type: [AiBaiduOcr] })
    list: AiBaiduOcr[];
}

export class AiBaiduOcrPaginateResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: AiBaiduOcrPaginatePage })
    data: AiBaiduOcrPaginatePage;
}