import { Module } from '@nestjs/common';
import { AiBaiduSessionService } from './ai-baidu-session.service';
import { AiBaiduSessionController } from './ai-baidu-session.controller';
import { AiBaiduSession } from './entities/ai-baidu-session.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AiBaiduSession])],
  controllers: [AiBaiduSessionController],
  providers: [AiBaiduSessionService]
})
export class AiBaiduSessionModule {}
