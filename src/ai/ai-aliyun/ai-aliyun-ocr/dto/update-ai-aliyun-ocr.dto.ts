import { PartialType } from '@nestjs/swagger';
import { CreateAiAliyunOcrDto } from './create-ai-aliyun-ocr.dto';

export class UpdateAiAliyunOcrDto extends PartialType(CreateAiAliyunOcrDto) {}
