import { ApiProperty } from '@nestjs/swagger';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

export class SuccessResult<T> {
  @ApiProperty()
    code: number;
  
  @ApiProperty()
    data: T;
}

export class InsertSuccessResult extends SuccessResult<InsertResult> {
  @ApiProperty()
    data: InsertResult;
}

export class DeleteSuccessResult extends SuccessResult<DeleteResult> {
  @ApiProperty()
    data: DeleteResult;
}

export class UpdateSuccessResult extends SuccessResult<UpdateResult> {
  @ApiProperty()
    data: UpdateResult;
}

export class PaginateResult<T> {
  @ApiProperty()
    list: T[];

  @ApiProperty()
    count: number;
}