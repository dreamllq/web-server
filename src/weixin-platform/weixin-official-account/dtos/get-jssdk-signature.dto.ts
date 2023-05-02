import { ApiProperty } from '@nestjs/swagger';

export class GetJssdkSignatureDto {
  @ApiProperty({ type: Boolean })
    debug:boolean;
  
  @ApiProperty({ type: String })
    url:string;

  @ApiProperty({ type: [String] })
    jsApiList: string[];
}