import { PartialType } from '@nestjs/swagger';
import { CreateBiChartSettingDto } from './create-bi-chart-setting.dto';

export class UpdateBiChartSettingDto extends PartialType(CreateBiChartSettingDto) {}
