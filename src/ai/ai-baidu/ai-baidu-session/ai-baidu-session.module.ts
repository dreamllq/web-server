import { Module } from '@nestjs/common';
import { AiBaiduSessionService } from './ai-baidu-session.service';
import { AiBaiduSessionController } from './ai-baidu-session.controller';

@Module({
  controllers: [AiBaiduSessionController],
  providers: [AiBaiduSessionService]
})
export class AiBaiduSessionModule {}
