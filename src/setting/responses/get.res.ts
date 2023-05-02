import { ApiProperty } from '@nestjs/swagger';
import { SuccessResult } from 'src/common-model';
import { Setting } from '../setting.entity';

export class SettingGetItemsSuccessResponse extends SuccessResult<Setting[]> {
  @ApiProperty({ type: [Setting] })
    data:Setting[];
}