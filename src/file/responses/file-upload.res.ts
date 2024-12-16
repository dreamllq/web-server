import { ApiProperty } from '@nestjs/swagger';
import { File } from '../file.entity';

class UploadFileInfo {
  @ApiProperty()
    url:string;
  @ApiProperty()
    fileId:string;
  @ApiProperty()
    entity:File;
}


export class FileUploadResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: UploadFileInfo })
    data:UploadFileInfo;
}