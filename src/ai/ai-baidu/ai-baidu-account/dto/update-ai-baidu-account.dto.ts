import { PartialType } from '@nestjs/swagger';
import { CreateAiBaiduAccountDto } from './create-ai-baidu-account.dto';

export class UpdateAiBaiduAccountDto extends PartialType(CreateAiBaiduAccountDto) {}
