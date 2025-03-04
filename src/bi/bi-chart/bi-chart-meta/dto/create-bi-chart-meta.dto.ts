import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

class DataMeta {
  @ApiProperty()
  @IsString()
    id: string;
}
export class CreateBiChartMetaDto {
  @ApiProperty()
  @IsString()
    name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
    desc: string;

  @ApiProperty({ type: DataMeta })
    data: DataMeta;
}
