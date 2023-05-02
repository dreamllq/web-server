import { Module } from '@nestjs/common';
import { WsMessageGateway } from './ws-message.gateway';
import { WsMessageService } from './ws-message.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [WsMessageGateway, WsMessageService],
  exports: [WsMessageService]
})
export class WsMessageModule {}
