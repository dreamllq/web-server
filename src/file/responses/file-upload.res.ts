import { ApiProperty } from '@nestjs/swagger';

class UploadFileInfo {
  @ApiProperty()
    url:string;
  @ApiProperty()
    fileId:string;
}


export class FileUploadResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: UploadFileInfo })
    data:UploadFileInfo;
}