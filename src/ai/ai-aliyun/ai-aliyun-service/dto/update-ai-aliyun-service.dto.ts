import { PartialType } from '@nestjs/swagger';
import { CreateAiAliyunServiceDto } from './create-ai-aliyun-service.dto';

export class UpdateAiAliyunServiceDto extends PartialType(CreateAiAliyunServiceDto) {}
