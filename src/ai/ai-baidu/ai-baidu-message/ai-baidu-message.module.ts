import { Module } from '@nestjs/common';
import { AiBaiduMessageService } from './ai-baidu-message.service';
import { AiBaiduMessageController } from './ai-baidu-message.controller';
import { AiBaiduMessage } from './entities/ai-baidu-message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { AiBaiduMessageQueueService } from './ai-baidu-message.queue.service';
import { AiBaiduMessageQueueConsumer } from './ai-baidu-message.queue.consumer';
import { WsMessageChannelQueueModule } from 'src/message-channel/ws-message-channel-queue/ws-message-channel-queue.module';
import { WsMessageChannelModule } from 'src/message-channel/ws-message-channel/ws-message-channel.module';
import { WsMessageModule } from 'src/ws/ws-message/ws-message.module';
import { AiBaiduMessageSdkService } from './ai-baidu-message-sdk.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AiBaiduMessage]),
    BullModule.registerQueue({ name: 'aiBaiduMessage' }),
    WsMessageChannelQueueModule,
    WsMessageChannelModule,
    WsMessageModule
  ],
  controllers: [AiBaiduMessageController],
  providers: [
    AiBaiduMessageService,
    AiBaiduMessageSdkService,
    AiBaiduMessageQueueService,
    AiBaiduMessageQueueConsumer
  ],
  exports: [AiBaiduMessageService]
})
export class AiBaiduMessageModule {}
