import { ApiProperty } from '@nestjs/swagger';
import { Area } from '../area.entity';

export class AreaResponse {
  @ApiProperty()
    code: number;
  @ApiProperty({ type: [Area] })
    data:Area[];
}