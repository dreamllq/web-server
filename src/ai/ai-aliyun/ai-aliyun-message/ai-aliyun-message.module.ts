import { Module } from '@nestjs/common';
import { AiAliyunMessageService } from './ai-aliyun-message.service';
import { AiAliyunMessageController } from './ai-aliyun-message.controller';
import { AiAliyunMessage } from './entities/ai-aliyun-message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { WsMessageChannelQueueModule } from 'src/message-channel/ws-message-channel-queue/ws-message-channel-queue.module';
import { WsMessageChannelModule } from 'src/message-channel/ws-message-channel/ws-message-channel.module';
import { WsMessageModule } from 'src/ws/ws-message/ws-message.module';
import { AiAliyunMessageQueueService } from './ai-aliyun-message.queue.service';
import { AiAliyunMessageQueueConsumer } from './ai-aliyun-message.queue.consumer';
import { AiAliyunMessageSdkService } from './ai-aliyun-message-sdk.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AiAliyunMessage]),
    BullModule.registerQueue({ name: 'aiAliyunMessage' }),
    WsMessageChannelQueueModule,
    WsMessageChannelModule,
    WsMessageModule
  ],
  controllers: [AiAliyunMessageController],
  providers: [
    AiAliyunMessageService,
    AiAliyunMessageSdkService,
    AiAliyunMessageQueueService,
    AiAliyunMessageQueueConsumer
  ],
  exports: [AiAliyunMessageService]
})
export class AiAliyunMessageModule {}
