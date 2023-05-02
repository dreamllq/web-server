import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { WsMessageService } from './ws-message.service';

@WebSocketGateway(3001, { namespace: 'message' })
export class WsMessageGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  private logger = new Logger('WsMessageGateway');

  constructor(
    private readonly wsMessageService: WsMessageService,
    private readonly authService: AuthService
  ) {}
  
  afterInit(namespace) {
    this.wsMessageService.setNamespace(namespace);
  }

  handleConnection(client: Socket) {
    this.logger.log(`[message][connect] ${client.id}`);
    const authInfo = this.authService.verify(client.handshake.auth.token);
    const userId = authInfo.sub;
    if (userId) {
      client.join(userId);
    }
  }
  
  handleDisconnect(client: Socket) {
    this.logger.log(`[message][disconnect] ${client.id}`);
  }
}
