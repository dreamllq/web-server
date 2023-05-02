import { Injectable } from '@nestjs/common';
import { Message } from './message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WsMessageChannelQueueService } from 'src/message-channel/ws-message-channel-queue/ws-message-channel-queue.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    private wsMessageChannelService: WsMessageChannelQueueService,
  ) {}

  async send(data:{from:string, to:string, namespace:string, content:string}) {
    await this.messageRepository.insert({
      content: data.content,
      from: { id: data.from },
      to: { id: data.to },
      namespace: data.namespace
    });

    await this.wsMessageChannelService.add(data);
  }
}
