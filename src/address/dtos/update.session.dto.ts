import { ApiProperty } from '@nestjs/swagger';

export class AddressUpdateSessionDto {

  @ApiProperty()
    name:string;
  @ApiProperty()
    mobile: string;
  @ApiProperty()
    country: number;
  @ApiProperty()
    province: number;
  @ApiProperty()
    city: number;
  @ApiProperty()
    region: number;
  @ApiProperty()
    address:string;
  @ApiProperty()
    isDefault: boolean;
}