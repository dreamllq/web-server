import { PartialType } from '@nestjs/swagger';
import { CreateAiBaiduOcrDto } from './create-ai-baidu-ocr.dto';

export class UpdateAiBaiduOcrDto extends PartialType(CreateAiBaiduOcrDto) {}
