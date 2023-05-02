import { Module } from '@nestjs/common';
import { ChatMessageController } from './chat-message/chat-message.controller';
import { ChatMessageService } from './chat-message/chat-message.service';
import { ChatSessionController } from './chat-session/chat-session.controller';
import { ChatSessionService } from './chat-session/chat-session.service';
import { ChatContactsController } from './chat-contacts/chat-contacts.controller';
import { ChatContactsService } from './chat-contacts/chat-contacts.service';
import { ChatContacts } from './chat-contacts/chat-contacts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatSession } from './chat-session/chat-session.entity';
import { ChatMessage } from './chat-message/chat-message.entity';
import { ChatService } from './chat.service';
import { WsMessageChannelQueueModule } from 'src/message-channel/ws-message-channel-queue/ws-message-channel-queue.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ChatContacts,
      ChatSession,
      ChatMessage
    ]),
    WsMessageChannelQueueModule
  ],
  controllers: [
    ChatMessageController,
    ChatSessionController,
    ChatContactsController
  ],
  providers: [
    ChatMessageService,
    ChatSessionService,
    ChatContactsService,
    ChatService
  ]
})
export class ChatModule {}
