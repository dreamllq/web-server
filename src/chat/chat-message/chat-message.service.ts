import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, LessThan, Repository, MoreThan } from 'typeorm';
import { ChatMessage } from './chat-message.entity';
import { ChatMessageTypeEnum, FindDirectionEnum } from './chat-message.type';
import { ChatContacts } from '../chat-contacts/chat-contacts.entity';
import { User } from 'src/users/user.entity';
import * as moment from 'moment';
import { WsMessageChannelQueueService } from 'src/message-channel/ws-message-channel-queue/ws-message-channel-queue.service';

@Injectable()
export class ChatMessageService {
  constructor(
    @InjectRepository(ChatMessage)
    private chatMessageRepository: Repository<ChatMessage>,
    private wsMessageChannelService: WsMessageChannelQueueService,
  ) {}

  async createMessage(contacts: ChatContacts, message: { id?:string, type:ChatMessageTypeEnum, content: string, creator: User }) {
    const chatMessage = new ChatMessage();
    chatMessage.id = message.id;
    chatMessage.contacts = contacts;
    chatMessage.type = message.type;
    chatMessage.content = message.content;
    chatMessage.creator = message.creator;
    await this.chatMessageRepository.save(chatMessage);

    await this.wsMessageChannelService.add({
      to: contacts.creator.id,
      module: 'chat',
      command: 'newMessage',
      data: {
        contactsId: contacts.id,
        message: message.content 
      } 
    });
  }

  remove(id:string) {
    return this.chatMessageRepository.delete(id);
  }

  findByIds(ids:string[]) {
    return this.chatMessageRepository.find({ where: { id: In(ids) } });
  }

  async findWithCursor(data:{contactsId: string, fromId?: string, direction: FindDirectionEnum}) {
    let createDate;
    if (data.fromId) {
      const chatMessage = await this.chatMessageRepository.findOne({ where: { id: data.fromId } });
      createDate = chatMessage.createDate;
    }
    
    if (data.direction === FindDirectionEnum.Forward) {
      return this.chatMessageRepository.find({
        where: {
          createDate: createDate ? LessThan(createDate) : null,
          contacts: { id: data.contactsId }
        },
        order: { createDate: 'DESC' },
        take: 20,
        relations: {
          creator: true,
          contacts: { contacts: true }
        }
      });
    } else if (data.direction === FindDirectionEnum.Backward) {
      return this.chatMessageRepository.find({
        where: {
          createDate: createDate ? MoreThan(moment(createDate).add(1, 'millisecond').toDate()) : null,
          contacts: { id: data.contactsId }
        },
        order: { createDate: 'ASC' },
        relations: {
          creator: true,
          contacts: { contacts: true }
        }
      });
    }
  }

  async removeByContacts(data:{contactsId}) {
    await this.chatMessageRepository.delete({ contacts: { id: data.contactsId } });
  }
}
