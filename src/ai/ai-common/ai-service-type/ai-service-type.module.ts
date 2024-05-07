import { Module } from '@nestjs/common';
import { AiServiceTypeService } from './ai-service-type.service';
import { AiServiceTypeController } from './ai-service-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiServiceType } from './entities/ai-service-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AiServiceType])],
  controllers: [AiServiceTypeController],
  providers: [AiServiceTypeService]
})
export class AiServiceTypeModule {}
