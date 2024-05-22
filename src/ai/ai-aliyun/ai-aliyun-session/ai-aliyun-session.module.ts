import { Module } from '@nestjs/common';
import { AiAliyunSessionService } from './ai-aliyun-session.service';
import { AiAliyunSessionController } from './ai-aliyun-session.controller';
import { AiAliyunSession } from './entities/ai-aliyun-session.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AiAliyunSession])],
  controllers: [AiAliyunSessionController],
  providers: [AiAliyunSessionService]
})
export class AiAliyunSessionModule {}
