import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { WxMessageChannelConsumer } from './wx-message-channel.consumer';

@Module({
  imports: [BullModule.registerQueue({ name: 'wxMessage' })],
  providers: [WxMessageChannelConsumer],
  controllers: []
})
export class WxMessageChannelModule {}
