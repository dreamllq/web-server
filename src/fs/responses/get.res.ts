import { ApiProperty } from '@nestjs/swagger';
import { F } from '../entities/f.entity';

export class FGetResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: F })
    data: F;
}