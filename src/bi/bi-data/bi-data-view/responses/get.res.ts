import { ApiProperty } from '@nestjs/swagger';

class Column {
  
}

class DataView {
  @ApiProperty({ type: [Column] })
    columns: Column[];

  @ApiProperty({ type: [Object] })
    data: Record<string, any>[];
}

export class BiDataViewGetResponse {
  @ApiProperty()
    code: number;
  @ApiProperty({ type: DataView })
    data: DataView;
}