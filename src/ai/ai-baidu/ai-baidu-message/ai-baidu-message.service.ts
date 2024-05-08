import { Injectable } from '@nestjs/common';
import { CreateAiBaiduMessageDto } from './dto/create-ai-baidu-message.dto';
import { AiBaiduMessage } from './entities/ai-baidu-message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { AiBaiduMessageQueueService } from './ai-baidu-message.queue.service';
import { WsMessageChannelQueueService } from 'src/message-channel/ws-message-channel-queue/ws-message-channel-queue.service';

@Injectable()
export class AiBaiduMessageService {
  constructor(
    @InjectRepository(AiBaiduMessage)
    private aiBaiduMessageRepository: Repository<AiBaiduMessage>,
    private aiBaiduMessageQueueService: AiBaiduMessageQueueService,
    private wsMessageChannelService: WsMessageChannelQueueService,
  ) {}

  async create(createAiBaiduMessageDto: CreateAiBaiduMessageDto) {
    const qid = uuidv4();
    const data = await this.aiBaiduMessageRepository.insert({
      content: createAiBaiduMessageDto.content,
      role: 'user',
      qid: qid,
      session: { id: createAiBaiduMessageDto.sessionId }
    });

    await this.wsMessageChannelService.add({
      to: createAiBaiduMessageDto.sessionId,
      module: 'aiBaiduMessage',
      command: 'message',
      data: {
        role: 'user',
        content: createAiBaiduMessageDto.content
      } 
    });

    await this.aiBaiduMessageQueueService.add({ mid: data.identifiers[0].id });
    return data;
  }

  async createRes(reqMid:string, res:{
    created: string,
    id: string,
    is_truncated: boolean,
    need_clear_history: boolean,
    object: string,
    result: string,
    usage: {prompt_tokens: number, completion_tokens: number, total_tokens: number}
  }) {
    console.log(res);
  }

  async findOne(id:string) {
    return this.aiBaiduMessageRepository.findOne({
      where: { id },
      relations: {
        session: {
          service: true,
          account: true 
        } 
      } 
    });
  }
}
