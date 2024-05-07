import { Module } from '@nestjs/common';
import { AiServiceTypeModule } from './ai-service-type/ai-service-type.module';

@Module({ imports: [AiServiceTypeModule] })
export class AiCommonModule {}
