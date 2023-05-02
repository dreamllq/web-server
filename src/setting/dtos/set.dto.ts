import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

class StoreItem {
  @ApiProperty()
  @IsString()
    key:string;
    
  @ApiProperty()
  @IsString()
    value:string;
}

export class SettingSetDto {
  @ApiProperty({ type: [StoreItem] })
    data: StoreItem[];
}