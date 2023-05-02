import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ChatContactsService } from './chat-contacts/chat-contacts.service';
import { ChatSessionService } from './chat-session/chat-session.service';
import { ChatMessageService } from './chat-message/chat-message.service';
import { ChatMessageTypeEnum } from './chat-message/chat-message.type';

@Injectable()
export class ChatService {
  constructor(
    private readonly chatContactsService: ChatContactsService,
    private readonly chatSessionService: ChatSessionService,
    private readonly chatMessageService: ChatMessageService
  ) {}

  async sendMessage(data:{id: string, type:ChatMessageTypeEnum, content: string, contactsId: string }) {
    const creatorChatContacts = await this.chatContactsService.findOne(data.contactsId);
    if (!creatorChatContacts) {
      throw new HttpException({
        message: '未添加好友',
        code: 11002
      }, HttpStatus.BAD_REQUEST);
    }

    const toChatContacts = await this.chatContactsService.findWidthFilter({
      contactsId: creatorChatContacts.creator.id,
      creatorId: creatorChatContacts.contacts.id
    });

    if (!toChatContacts) {
      throw new HttpException({
        message: '未添加好友',
        code: 11002
      }, HttpStatus.BAD_REQUEST);
    }


    await this.chatSessionService.create({
      contactsId: creatorChatContacts.id,
      creatorId: creatorChatContacts.creator.id
    });

    if (creatorChatContacts.id !== toChatContacts.id) {
      await this.chatSessionService.create({
        contactsId: toChatContacts.id,
        creatorId: toChatContacts.creator.id
      });
    }

    // if (creatorChatContacts.id !== toChatContacts.id) {
    await this.chatMessageService.createMessage(creatorChatContacts, {
      id: data.id,
      type: data.type,
      content: data.content,
      creator: creatorChatContacts.creator
    });
    // }

    if (creatorChatContacts.id !== toChatContacts.id) {
      await this.chatMessageService.createMessage(toChatContacts, {
        type: data.type,
        content: data.content,
        creator: creatorChatContacts.creator
      });
    }
  }

  async removeContacts(contactsId, creatorId) {
    await this.chatMessageService.removeByContacts({ contactsId });
    await this.chatSessionService.removeByContacts(contactsId, creatorId);
    this.chatContactsService.remove(contactsId, creatorId);
  }
}
