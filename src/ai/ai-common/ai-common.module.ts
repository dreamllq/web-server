import { Module } from '@nestjs/common';
import { AiServiceTypeModule } from './ai-service-type/ai-service-type.module';
import { AiSessionModule } from './ai-session/ai-session.module';

@Module({ imports: [AiServiceTypeModule, AiSessionModule] })
export class AiCommonModule {}
