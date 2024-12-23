import { ApiProperty } from '@nestjs/swagger';
import { File } from '../file.entity';

export class FileGetResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: File })
    data: File;
}