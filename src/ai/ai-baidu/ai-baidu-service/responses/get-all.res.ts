import { ApiProperty } from '@nestjs/swagger';
import { AiBaiduService } from '../entities/ai-baidu-service.entity';

export class AiBaiduServiceGetAllResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: [AiBaiduService] })
    data: AiBaiduService[];
}