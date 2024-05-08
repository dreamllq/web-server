import { Injectable } from '@nestjs/common';
import { CreateAiBaiduMessageDto } from './dto/create-ai-baidu-message.dto';
import { AiBaiduMessage } from './entities/ai-baidu-message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AiBaiduMessageService {
  constructor(
    @InjectRepository(AiBaiduMessage)
    private aiBaiduMessageRepository: Repository<AiBaiduMessage>,
  ) {}

  create(createAiBaiduMessageDto: CreateAiBaiduMessageDto) {
    const qid = uuidv4();
    return this.aiBaiduMessageRepository.insert({
      content: createAiBaiduMessageDto.content,
      role: 'user',
      qid: qid,
      session: { id: createAiBaiduMessageDto.sessionId }
    });
  }
}
