import { PartialType } from '@nestjs/swagger';
import { CreateAiBaiduSessionDto } from './create-ai-baidu-session.dto';

export class UpdateAiBaiduSessionDto extends PartialType(CreateAiBaiduSessionDto) {}
