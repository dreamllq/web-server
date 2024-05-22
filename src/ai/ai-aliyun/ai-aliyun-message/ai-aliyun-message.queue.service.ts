import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class AiAliyunMessageQueueService {
  private logger = new Logger('AiAliyunMessageQueueService');
  constructor(
    @InjectQueue('aiAliyunMessage') private messageQueue: Queue
  ) {}

  async add(data: {mid: string}) {
    this.logger.log(`[Queue add] ${JSON.stringify(data)}`);
    const job = await this.messageQueue.add('chatMessage', data);
    return job;
  }
}
