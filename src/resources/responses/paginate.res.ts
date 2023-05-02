import { ApiProperty } from '@nestjs/swagger';
import { PaginateResult, SuccessResult } from 'src/common-model';
import { Resource } from '../resource.entity';

class ResourcePaginateResult extends PaginateResult<Resource> {
  @ApiProperty({ type: [Resource] })
    list: Resource[];
}

export class ResourcePaginateSuccessResult extends SuccessResult<ResourcePaginateResult> {
  @ApiProperty({ type: ResourcePaginateResult })
    data:ResourcePaginateResult;
}