import { Module } from '@nestjs/common';
import { WsMessageChannelQueueService } from './ws-message-channel-queue.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [BullModule.registerQueue({ name: 'wsMessage' })],
  providers: [WsMessageChannelQueueService],
  exports: [WsMessageChannelQueueService]
})
export class WsMessageChannelQueueModule {}
