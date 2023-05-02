import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { Message } from './message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WsMessageChannelQueueModule } from 'src/message-channel/ws-message-channel-queue/ws-message-channel-queue.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), WsMessageChannelQueueModule],
  controllers: [MessageController],
  providers: [MessageService]
})
export class MessageModule {}
