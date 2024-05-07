import { PartialType } from '@nestjs/swagger';
import { CreateAiBaiduServiceDto } from './create-ai-baidu-service.dto';

export class UpdateAiBaiduServiceDto extends PartialType(CreateAiBaiduServiceDto) {}
