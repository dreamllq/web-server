import { PartialType } from '@nestjs/swagger';
import { CreateBiViewMetaDto } from './create-bi-view-meta.dto';

export class UpdateBiViewMetaDto extends PartialType(CreateBiViewMetaDto) {}
