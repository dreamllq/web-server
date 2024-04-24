import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { WxMessageChannelQueueService } from './wx-message-channel-queue.service';

@Module({
  imports: [BullModule.registerQueue({ name: 'wxMessage' })],
  providers: [WxMessageChannelQueueService],
  exports: [WxMessageChannelQueueService] 
})
export class WxMessageChannelQueueModule {}
