import { ApiProperty } from '@nestjs/swagger';
import { BiDataStruct } from '../entities/bi-data-struct.entity';

export class BiDataStructGetAllResponse {
  @ApiProperty()
    code: number;
  @ApiProperty({ type: [BiDataStruct] })
    data: BiDataStruct[];
}