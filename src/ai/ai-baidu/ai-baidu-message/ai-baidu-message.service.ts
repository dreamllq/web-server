import { Injectable, Logger } from '@nestjs/common';
import { CreateAiBaiduMessageDto } from './dto/create-ai-baidu-message.dto';
import { AiBaiduMessage } from './entities/ai-baidu-message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { AiBaiduMessageQueueService } from './ai-baidu-message.queue.service';
import { WsMessageChannelQueueService } from 'src/message-channel/ws-message-channel-queue/ws-message-channel-queue.service';
import { AiBaiduMessageSdkService } from './ai-baidu-message-sdk.service';

@Injectable()
export class AiBaiduMessageService {
  private logger = new Logger('AiBaiduMessageService');
  constructor(
    @InjectRepository(AiBaiduMessage)
    private aiBaiduMessageRepository: Repository<AiBaiduMessage>,
    private aiBaiduMessageQueueService: AiBaiduMessageQueueService,
    private wsMessageChannelService: WsMessageChannelQueueService,
    private readonly aiBaiduMessageSdkService:AiBaiduMessageSdkService,
  ) {}

  async create(createAiBaiduMessageDto: CreateAiBaiduMessageDto) {
    const qid = uuidv4();
    const data = await this.aiBaiduMessageRepository.insert({
      content: createAiBaiduMessageDto.content,
      role: 'user',
      qid: qid,
      session: { id: createAiBaiduMessageDto.sessionId },
      status: 'done'
    });

    await this.wsMessageChannelService.add({
      to: createAiBaiduMessageDto.sessionId,
      module: 'aiBaiduMessage',
      command: 'message',
      data: {
        id: data.identifiers[0].id,
        role: 'user',
        sessionId: createAiBaiduMessageDto.sessionId,
        content: createAiBaiduMessageDto.content,
        status: 'done'
      } 
    });

    await this.aiBaiduMessageQueueService.add({ mid: data.identifiers[0].id });

    const data2 = await this.aiBaiduMessageRepository.insert({
      content: '',
      role: 'assistant',
      qid: qid,
      session: { id: createAiBaiduMessageDto.sessionId },
      status: 'loading'
    });

    await this.wsMessageChannelService.add({
      to: createAiBaiduMessageDto.sessionId,
      module: 'aiBaiduMessage',
      command: 'message',
      data: {
        id: data2.identifiers[0].id,
        role: 'assistant',
        sessionId: createAiBaiduMessageDto.sessionId,
        content: '',
        status: 'loading'
      } 
    });

    return data;
  }


  async createAiResponse(options:{mid: string}) {
    const message = await this.findOne(options.mid);
    const message2 = await this.aiBaiduMessageRepository.findOne({
      where: {
        qid: message.qid,
        role: 'assistant' 
      },
      relations: {
        session: {
          service: true,
          account: true 
        } 
      } 
    });
    const messageList = await this.aiBaiduMessageRepository.find({
      where: {
        session: { id: message.session.id },
        status: 'done' 
      },
      order: { createDate: 'ASC' } 
    });
    const messages = messageList.map(item => ({
      role: item.role,
      content: item.content 
    }));
    let result = {};
    try {
      this.logger.log(`[createAiResponse][aiBaiduMessageSdkService.chat] ${JSON.stringify({
        message,
        messages 
      })}`);
      const chatRes = await this.aiBaiduMessageSdkService.chat(message, messages);
      this.logger.log(`[createAiResponse][chatRes] ${JSON.stringify(chatRes)}`);
      
      await this.aiBaiduMessageRepository.update(message2.id, {
        content: chatRes.result,
        status: 'done'
      });

      await this.wsMessageChannelService.add({
        to: message.session.id,
        module: 'aiBaiduMessage',
        command: 'message-change',
        data: {
          id: message2.id,
          role: 'assistant',
          sessionId: message2.session.id,
          content: chatRes.result,
          status: 'done'
        } 
      });

      result = { mid: message2.id };
    } catch (e) {
      this.logger.log(`[createAiResponse][error] ${JSON.stringify(e)}`);
      await this.aiBaiduMessageRepository.update(message2.id, {
        content: e.message,
        status: 'done'
      });

      await this.wsMessageChannelService.add({
        to: message.session.id,
        module: 'aiBaiduMessage',
        command: 'message-change',
        data: {
          id: message2.id,
          role: 'assistant',
          sessionId: message2.session.id,
          content: e.message,
          status: 'done'
        } 
      });
      result = { mid: message2.id };
    }
    return result;
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

  async getHistory(sessionId:string) {
    return this.aiBaiduMessageRepository.find({
      where: { session: { id: sessionId } },
      order: { createDate: 'ASC' } 
    });
  }

  async removeBySessionId(sessionId: string) {
    return this.aiBaiduMessageRepository.delete({ session: { id: sessionId } });
  }
}
