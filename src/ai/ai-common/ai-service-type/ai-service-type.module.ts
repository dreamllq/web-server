import { Module } from '@nestjs/common';
import { AiServiceTypeService } from './ai-service-type.service';
import { AiServiceTypeController } from './ai-service-type.controller';

@Module({
  controllers: [AiServiceTypeController],
  providers: [AiServiceTypeService]
})
export class AiServiceTypeModule {}
