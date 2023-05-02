import { ApiProperty } from '@nestjs/swagger';

class KeyInfo {
  @ApiProperty()
    encrypt_key: string;
  @ApiProperty()
    version:number;
  @ApiProperty()
    expire_in: number;
  @ApiProperty()
    iv:string;
  @ApiProperty()
    create_time: number;
}

export class getUserEncryptKeyResponse {
  @ApiProperty()
    code: number;

  @ApiProperty({ type: [KeyInfo] })
    data: KeyInfo[];
}