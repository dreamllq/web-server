import { ApiProperty } from '@nestjs/swagger';
import { SuccessResult } from 'src/common-model';

class Token {
  @ApiProperty()
    access_token: string;
}

export class AuthLoginSuccessResponse extends SuccessResult<Token> {
  
  @ApiProperty({ type: Token })
    data: Token;
}