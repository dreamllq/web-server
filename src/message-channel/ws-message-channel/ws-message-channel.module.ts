import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { WsMessageChannelConsumer } from './ws-message-channel.consumer';
import { WsMessageModule } from 'src/ws/ws-message/ws-message.module';

@Module({
  imports: [BullModule.registerQueue({ name: 'wsMessage' }), WsMessageModule],
  providers: [WsMessageChannelConsumer],
  controllers: []
})
export class WsMessageChannelModule {}
