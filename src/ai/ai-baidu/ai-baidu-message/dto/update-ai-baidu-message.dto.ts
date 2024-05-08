import { PartialType } from '@nestjs/swagger';
import { CreateAiBaiduMessageDto } from './create-ai-baidu-message.dto';

export class UpdateAiBaiduMessageDto extends PartialType(CreateAiBaiduMessageDto) {}
