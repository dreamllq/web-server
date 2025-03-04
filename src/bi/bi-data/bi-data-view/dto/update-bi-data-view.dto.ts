import { PartialType } from '@nestjs/swagger';
import { CreateBiDataViewDto } from './create-bi-data-view.dto';

export class UpdateBiDataViewDto extends PartialType(CreateBiDataViewDto) {}
