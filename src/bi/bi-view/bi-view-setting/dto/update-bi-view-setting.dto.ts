import { PartialType } from '@nestjs/swagger';
import { CreateBiViewSettingDto } from './create-bi-view-setting.dto';

export class UpdateBiViewSettingDto extends PartialType(CreateBiViewSettingDto) {}
