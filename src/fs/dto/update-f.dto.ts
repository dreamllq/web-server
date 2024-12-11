import { PartialType } from '@nestjs/swagger';
import { CreateFDto } from './create-f.dto';

export class UpdateFDto extends PartialType(CreateFDto) {

}
