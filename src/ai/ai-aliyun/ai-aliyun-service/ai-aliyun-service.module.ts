import { Module } from '@nestjs/common';
import { AiAliyunServiceService } from './ai-aliyun-service.service';
import { AiAliyunServiceController } from './ai-aliyun-service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiAliyunService } from './entities/ai-aliyun-service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AiAliyunService])],
  controllers: [AiAliyunServiceController],
  providers: [AiAliyunServiceService]
})
export class AiAliyunServiceModule {}
