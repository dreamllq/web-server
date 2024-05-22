import { PartialType } from '@nestjs/swagger';
import { CreateAiAliyunSessionDto } from './create-ai-aliyun-session.dto';

export class UpdateAiAliyunSessionDto extends PartialType(CreateAiAliyunSessionDto) {}
