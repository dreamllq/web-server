import { ApiProperty } from '@nestjs/swagger';
import { AiBaiduService } from '../entities/ai-baidu-service.entity';

class AiBaiduServicePaginatePage {
  @ApiProperty()
    count: number;
  @ApiProperty({ type: [AiBaiduService] })
    list: AiBaiduService[];
}

export class AiBaiduServicePaginateResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: AiBaiduServicePaginatePage })
    data: AiBaiduServicePaginatePage;
}