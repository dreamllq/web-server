import { Module } from '@nestjs/common';
import { AiBaiduSessionService } from './ai-baidu-session.service';
import { AiBaiduSessionController } from './ai-baidu-session.controller';
import { AiBaiduSession } from './entities/ai-baidu-session.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiBaiduMessageModule } from '../ai-baidu-message/ai-baidu-message.module';

@Module({
  imports: [TypeOrmModule.forFeature([AiBaiduSession]), AiBaiduMessageModule],
  controllers: [AiBaiduSessionController],
  providers: [AiBaiduSessionService]
})
export class AiBaiduSessionModule {}
