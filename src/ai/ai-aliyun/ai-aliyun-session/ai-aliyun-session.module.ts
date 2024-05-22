import { Module } from '@nestjs/common';
import { AiAliyunSessionService } from './ai-aliyun-session.service';
import { AiAliyunSessionController } from './ai-aliyun-session.controller';
import { AiAliyunSession } from './entities/ai-aliyun-session.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiAliyunMessageModule } from '../ai-aliyun-message/ai-aliyun-message.module';

@Module({
  imports: [TypeOrmModule.forFeature([AiAliyunSession]), AiAliyunMessageModule],
  controllers: [AiAliyunSessionController],
  providers: [AiAliyunSessionService]
})
export class AiAliyunSessionModule {}
