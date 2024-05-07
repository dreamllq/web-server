import { PartialType } from '@nestjs/swagger';
import { CreateAiServiceTypeDto } from './create-ai-service-type.dto';

export class UpdateAiServiceTypeDto extends PartialType(CreateAiServiceTypeDto) {}
