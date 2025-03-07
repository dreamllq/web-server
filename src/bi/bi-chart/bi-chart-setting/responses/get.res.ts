import { ApiProperty } from '@nestjs/swagger';
import { BiChartSetting } from '../entities/bi-chart-setting.entity';

export class BiChartSettingGetResponse {
  @ApiProperty()
    code: number;
  @ApiProperty({ type: BiChartSetting })
    data: BiChartSetting;
}