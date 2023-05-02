import { ApiProperty } from '@nestjs/swagger';

class Watermark {
  @ApiProperty()
    timestamp: number;

  @ApiProperty()
    appid: string;
}

class PhoneInfo {
  @ApiProperty()
    phoneNumber: string;

  @ApiProperty()
    purePhoneNumber: string;

  @ApiProperty()
    countryCode: number;

  @ApiProperty()
    watermark: Watermark;
}

export class GetPhoneNumberResponse {
  @ApiProperty()
    code: number;

  @ApiProperty()
    data: PhoneInfo;
}