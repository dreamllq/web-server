import { ApiProperty } from '@nestjs/swagger';
import { AiServiceType } from '../entities/ai-service-type.entity';

export class AiServiceTypeGetResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: AiServiceType })
    data: AiServiceType;
}