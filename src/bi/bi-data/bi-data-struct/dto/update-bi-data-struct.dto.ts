import { PartialType } from '@nestjs/swagger';
import { CreateBiDataStructDto } from './create-bi-data-struct.dto';

export class UpdateBiDataStructDto extends PartialType(CreateBiDataStructDto) {}
