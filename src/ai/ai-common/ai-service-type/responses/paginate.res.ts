import { ApiProperty } from '@nestjs/swagger';
import { AiServiceType } from '../entities/ai-service-type.entity';

class AiServiceTypePaginatePage {
  @ApiProperty()
    count: number;
  @ApiProperty({ type: [AiServiceType] })
    list: AiServiceType[];
}

export class AiServiceTypePaginateResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: AiServiceTypePaginatePage })
    data: AiServiceTypePaginatePage;
}