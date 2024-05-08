import { Module } from '@nestjs/common';
import { AiBaiduMessageService } from './ai-baidu-message.service';
import { AiBaiduMessageController } from './ai-baidu-message.controller';

@Module({
  controllers: [AiBaiduMessageController],
  providers: [AiBaiduMessageService]
})
export class AiBaiduMessageModule {}
