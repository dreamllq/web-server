import { ApiProperty } from '@nestjs/swagger';
import { SuccessResult } from 'src/common-model';
import { Resource } from '../resource.entity';

export class ResourceGetSuccessResult extends SuccessResult<Resource> {
  @ApiProperty({ type: Resource })
    data:Resource;
}