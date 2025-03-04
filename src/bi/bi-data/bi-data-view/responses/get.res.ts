import { ApiProperty } from '@nestjs/swagger';
import { BiDataStruct } from '../../bi-data-struct/entities/bi-data-struct.entity';

class BiDataViewColumn {
  @ApiProperty()
    field: string;

  @ApiProperty()
    headerName: string;
    
  @ApiProperty({ type: BiDataStruct })
    struct:BiDataStruct;
}

class DataView {
  @ApiProperty({ type: [BiDataViewColumn] })
    columns: BiDataViewColumn[];

  @ApiProperty({ type: [Object] })
    data: Record<string, any>[];
}

export class BiDataViewGetResponse {
  @ApiProperty()
    code: number;
  @ApiProperty({ type: DataView })
    data: DataView;
}