import { PartialType } from '@nestjs/swagger';
import { CreateAiAliyunAccountDto } from './create-ai-aliyun-account.dto';

export class UpdateAiAliyunAccountDto extends PartialType(CreateAiAliyunAccountDto) {}
