import { PartialType } from '@nestjs/swagger';
import { CreateBiDataMetaDto } from './create-bi-data-meta.dto';

export class UpdateBiDataMetaDto extends PartialType(CreateBiDataMetaDto) {}
