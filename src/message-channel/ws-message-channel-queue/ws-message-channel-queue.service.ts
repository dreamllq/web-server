import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class WsMessageChannelQueueService {
  private logger = new Logger('WsMessageChannelService');
  constructor(
    @InjectQueue('wsMessage') private messageQueue: Queue
  ) {}

  async add(data: {to:string, [index:string]:any}) {
    this.logger.log(`[Queue add] ${JSON.stringify(data)}`);
    const job = await this.messageQueue.add('sendMessage', data);
    return job;
  }
}
