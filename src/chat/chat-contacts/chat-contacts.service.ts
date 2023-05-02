import { Injectable } from '@nestjs/common';
import { ChatContacts } from './chat-contacts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatContactsTypeEnum } from './chat-contacts.type';
import { WsMessageChannelQueueService } from 'src/message-channel/ws-message-channel-queue/ws-message-channel-queue.service';

@Injectable()
export class ChatContactsService {
  constructor(
    @InjectRepository(ChatContacts)
    private chatContactsRepository: Repository<ChatContacts>,
    private wsMessageChannelService: WsMessageChannelQueueService,
  ) {}

  async create(data:{creatorId: string, contactsId: string}) {
    const currentUser = await this.chatContactsRepository.findOneBy({
      contacts: { id: data.contactsId },
      creator: { id: data.creatorId }
    });

    if (!currentUser) {
      await this.chatContactsRepository.insert({
        contacts: { id: data.contactsId },
        creator: { id: data.creatorId },
        status: ChatContactsTypeEnum.WaitingVerification
      });
    }

    const contactsUser = await this.chatContactsRepository.findOneBy({
      contacts: { id: data.creatorId },
      creator: { id: data.contactsId }
    });

    if (!contactsUser) {
      await this.chatContactsRepository.insert({
        contacts: { id: data.creatorId },
        creator: { id: data.contactsId },
        status: ChatContactsTypeEnum.CanPass
      });
    } else {
      contactsUser.status = ChatContactsTypeEnum.CanPass;
      await this.chatContactsRepository.save(contactsUser);
    }

    await this.wsMessageChannelService.add({
      to: data.creatorId,
      module: 'chat',
      command: 'newFriend'
    });

    if (data.creatorId !== data.contactsId) {
      await this.wsMessageChannelService.add({
        to: data.contactsId,
        module: 'chat',
        command: 'newFriend'
      });
    }
  }

  async remove(id, creatorId) {
    await this.chatContactsRepository.delete(id);
    await this.wsMessageChannelService.add({
      to: creatorId,
      module: 'chat',
      command: 'newFriend'
    });
  }

  update(id, data:{status:ChatContactsTypeEnum}) {
    return this.chatContactsRepository.update(id, { status: data.status });
  }

  async updateStatus(id, status) {
    const currentContacts = await this.chatContactsRepository.findOne({
      where: { id },
      relations: {
        contacts: true,
        creator: true 
      } 
    });

    const relationContacts = await this.chatContactsRepository.findOne({
      where: {
        contacts: { id: currentContacts.creator.id },
        creator: { id: currentContacts.contacts.id }
      } 
    });

    if (status === ChatContactsTypeEnum.Refuse) {
      currentContacts.status = ChatContactsTypeEnum.Refuse;
      relationContacts.status = ChatContactsTypeEnum.Refused;
    } else if (status === ChatContactsTypeEnum.Passed) {
      currentContacts.status = ChatContactsTypeEnum.Passed;
      relationContacts.status = ChatContactsTypeEnum.Passed;
    }

    this.chatContactsRepository.save(currentContacts);
    this.chatContactsRepository.save(relationContacts);

    await this.wsMessageChannelService.add({
      to: currentContacts.creator.id,
      module: 'chat',
      command: 'newFriend'
    });

    await this.wsMessageChannelService.add({
      to: currentContacts.contacts.id,
      module: 'chat',
      command: 'newFriend'
    });
  }

  findAll(data:{creatorId: string}) {
    return this.chatContactsRepository.find({ 
      where: { creator: { id: data.creatorId } },
      order: { contacts: { nickName: 'ASC' } },
      relations: { contacts: true } 
    });
  }

  findOne(id) {
    return this.chatContactsRepository.findOne({
      where: { id },
      relations: {
        contacts: true,
        creator: true
      } 
    });
  }

  findWidthFilter(data:{contactsId: string, creatorId: string}) {
    return this.chatContactsRepository.findOne({
      where: {
        contacts: { id: data.contactsId },
        creator: { id: data.creatorId }
      },
      relations: {
        contacts: true,
        creator: true
      }
    });
  }
}
