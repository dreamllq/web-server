import { ApiProperty } from '@nestjs/swagger';
import { BiViewSetting } from '../entities/bi-view-setting.entity';

export class BiViewSettingGetResponse {
  @ApiProperty()
    code: number;
  @ApiProperty({ type: BiViewSetting })
    data: BiViewSetting;
}