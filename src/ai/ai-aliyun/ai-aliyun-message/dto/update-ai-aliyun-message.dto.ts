import { PartialType } from '@nestjs/swagger';
import { CreateAiAliyunMessageDto } from './create-ai-aliyun-message.dto';

export class UpdateAiAliyunMessageDto extends PartialType(CreateAiAliyunMessageDto) {}
