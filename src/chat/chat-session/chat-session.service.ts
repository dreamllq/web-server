import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatSession } from './chat-session.entity';
import { WsMessageChannelQueueService } from 'src/message-channel/ws-message-channel-queue/ws-message-channel-queue.service';

@Injectable()
export class ChatSessionService {
  constructor(
    @InjectRepository(ChatSession)
    private chatSessionRepository: Repository<ChatSession>,
    private wsMessageChannelService: WsMessageChannelQueueService,
  ) {}

  async create(data:{creatorId: string, contactsId: string}) {
    const session = await this.chatSessionRepository.findOne({
      where: {
        contacts: { id: data.contactsId },
        creator: { id: data.creatorId }
      },
      relations: { contacts: { contacts: true } }
    });

    let resultSession:ChatSession;

    if (!session) {
      const s = await this.chatSessionRepository.save(this.chatSessionRepository.create({
        contacts: { id: data.contactsId },
        creator: { id: data.creatorId }
      }));
      resultSession = await this.chatSessionRepository.findOne({
        where: { id: s.id },
        relations: {
          contacts: { contacts: true },
          creator: true
        } 
      });
    } else {
      await this.chatSessionRepository.save(session);
      resultSession = session;
    }

    await this.wsMessageChannelService.add({
      to: data.creatorId,
      module: 'chat',
      command: 'newSession',
      data: { sessionId: resultSession.id } 
    });

    return resultSession;
  }

  async remove(id:string, creatorId:string) {
    await this.chatSessionRepository.delete(id);
    
    await this.wsMessageChannelService.add({
      to: creatorId,
      module: 'chat',
      command: 'newSession',
      data: { } 
    });
  }

  findAll(data:{creatorId: string}) {
    return this.chatSessionRepository.find({
      where: { creator: { id: data.creatorId } },
      order: { updateDate: 'DESC' },
      relations: { contacts: { contacts: true } }
    });
  }

  async removeByContacts(contactsId, creatorId) {
    await this.chatSessionRepository.delete({ contacts: { id: contactsId } });
    
    await this.wsMessageChannelService.add({
      to: creatorId,
      module: 'chat',
      command: 'newSession',
      data: { } 
    });
  }
}
