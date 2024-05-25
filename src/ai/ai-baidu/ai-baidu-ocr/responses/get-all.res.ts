import { ApiProperty } from '@nestjs/swagger';
import { AiBaiduOcr } from '../entities/ai-baidu-ocr.entity';

export class AiBaiduOcrGetAllResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: [AiBaiduOcr] })
    data: AiBaiduOcr[];
}