import { Injectable, Logger } from '@nestjs/common';
import { CreateAiAliyunMessageDto } from './dto/create-ai-aliyun-message.dto';
import { UpdateAiAliyunMessageDto } from './dto/update-ai-aliyun-message.dto';
import { AiAliyunMessage } from './entities/ai-aliyun-message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AiAliyunMessageQueueService } from './ai-aliyun-message.queue.service';
import { WsMessageChannelQueueService } from 'src/message-channel/ws-message-channel-queue/ws-message-channel-queue.service';
import { AiAliyunMessageSdkService } from './ai-aliyun-message-sdk.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AiAliyunMessageService {
  private logger = new Logger('AiAliyunMessageService');
  constructor(
    @InjectRepository(AiAliyunMessage)
    private aiAliyunMessageRepository: Repository<AiAliyunMessage>,
    private aiAliyunMessageQueueService: AiAliyunMessageQueueService,
    private wsMessageChannelService: WsMessageChannelQueueService,
    private readonly aiAliyunMessageSdkService:AiAliyunMessageSdkService,
  ) {}

  async create(createAiAliyunMessageDto: CreateAiAliyunMessageDto) {
    const qid = uuidv4();
    const data = await this.aiAliyunMessageRepository.insert({
      content: createAiAliyunMessageDto.content,
      role: 'user',
      qid: qid,
      session: { id: createAiAliyunMessageDto.sessionId },
      status: 'done'
    });

    await this.wsMessageChannelService.add({
      to: createAiAliyunMessageDto.sessionId,
      module: 'aiAliyunMessage',
      command: 'message',
      data: {
        id: data.identifiers[0].id,
        role: 'user',
        sessionId: createAiAliyunMessageDto.sessionId,
        content: createAiAliyunMessageDto.content,
        status: 'done'
      } 
    });

    await this.aiAliyunMessageQueueService.add({ mid: data.identifiers[0].id });

    const data2 = await this.aiAliyunMessageRepository.insert({
      content: '',
      role: 'system',
      qid: qid,
      session: { id: createAiAliyunMessageDto.sessionId },
      status: 'loading'
    });

    await this.wsMessageChannelService.add({
      to: createAiAliyunMessageDto.sessionId,
      module: 'aiAliyunMessage',
      command: 'message',
      data: {
        id: data2.identifiers[0].id,
        role: 'system',
        sessionId: createAiAliyunMessageDto.sessionId,
        content: '',
        status: 'loading'
      } 
    });

    return data;
  }


  async createAiResponse(options:{mid: string}) {
    const message = await this.findOne(options.mid);
    const message2 = await this.aiAliyunMessageRepository.findOne({
      where: {
        qid: message.qid,
        role: 'system' 
      },
      relations: {
        session: {
          service: { type: true },
          account: true 
        } 
      } 
    });
    const messageList = await this.aiAliyunMessageRepository.find({
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
      this.logger.log(`[createAiResponse][service type] ${message.session.service.type.name}-${message.session.service.type.value}`);
      let chatRes:{output:{text:string}};
      if (message.session.service.type.value === 'CHAT') {
        this.logger.log(`[createAiResponse][aiAliyunMessageSdkService.chat] ${JSON.stringify({
          message,
          messages 
        })}`);
        chatRes = await this.aiAliyunMessageSdkService.chat(message, messages);
        this.logger.log(`[createAiResponse][chatRes] ${JSON.stringify(chatRes)}`);
      } else if (message.session.service.type.value === 'TEXT_TO_IMAGE') {
        this.logger.log(`[createAiResponse][aiAliyunMessageSdkService.chat] ${JSON.stringify({ message })}`);
        chatRes = await this.aiAliyunMessageSdkService.messageToImage(message);
        this.logger.log(`[createAiResponse][messageToImageRes] ${JSON.stringify(chatRes)}`);
      }

      await this.aiAliyunMessageRepository.update(message2.id, {
        content: chatRes.output.text,
        status: 'done'
      });

      await this.wsMessageChannelService.add({
        to: message.session.id,
        module: 'aiAliyunMessage',
        command: 'message-change',
        data: {
          id: message2.id,
          role: 'assistant',
          sessionId: message2.session.id,
          content: chatRes.output.text,
          status: 'done'
        } 
      });

      result = { mid: message2.id };
    } catch (e) {
      this.logger.log(`[createAiResponse][error] ${JSON.stringify(e)}`);
      await this.aiAliyunMessageRepository.update(message2.id, {
        content: e.message,
        status: 'done'
      });

      await this.wsMessageChannelService.add({
        to: message.session.id,
        module: 'aiAliyunMessage',
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
    return this.aiAliyunMessageRepository.findOne({
      where: { id },
      relations: {
        session: {
          service: { type: true },
          account: true 
        } 
      } 
    });
  }

  async getHistory(sessionId:string) {
    return this.aiAliyunMessageRepository.find({
      where: { session: { id: sessionId } },
      order: { createDate: 'ASC' } 
    });
  }

  async removeBySessionId(sessionId: string) {
    return this.aiAliyunMessageRepository.delete({ session: { id: sessionId } });
  }
}
