import { ApiProperty } from '@nestjs/swagger';
import { Address } from '../address.entity';

export class AddressGetResponse {
  @ApiProperty()
    code: number;
  @ApiProperty({ type: Address })
    data: Address;
}