import { OnQueueActive, OnQueueCompleted, OnQueueError, Process, Processor } from '@nestjs/bull';
import { DoneCallback, Job } from 'bull';
import { Logger } from '@nestjs/common';
import { WsMessageService } from 'src/ws/ws-message/ws-message.service';
import { AiBaiduMessageService } from './ai-baidu-message.service';
import { AiBaiduMessageSdkService } from './ai-baidu-message-sdk.service';

@Processor('aiBaiduMessage')
export class AiBaiduMessageQueueConsumer {
  private logger = new Logger('AiBaiduMessageQueueConsumer');
  constructor(
    private readonly wsMessageService: WsMessageService, 
    private readonly aiBaiduMessageService:AiBaiduMessageService,
    private readonly aiBaiduMessageSdkService:AiBaiduMessageSdkService
  ) {}

  @Process({ name: 'chatMessage' })
  async chatMessage(job: Job<any>, done: DoneCallback) {
    this.logger.log(`[chatMessage] ${JSON.stringify(job.data)}`);
    try {
      const chatRes = await this.aiBaiduMessageSdkService.chat({ mid: job.data.mid });
      this.logger.log(`[chatRes] ${JSON.stringify(chatRes)}`);
      const message = await this.aiBaiduMessageService.findOne(job.data.mid);
      const result = await this.wsMessageService.send(message.session.id, {
        to: job.data.mid,
        module: 'aiBaiduMessage',
        command: 'message',
        data: chatRes 
      });
      done(null, result);
    } catch (e) {
      this.logger.log(`[error] ${JSON.stringify(e)}`);
      const result = await this.wsMessageService.send(job.data.mid, {
        to: job.data.mid,
        module: 'aiBaiduMessage',
        command: 'message',
        data: e 
      });
      done(null, result);
    }
  }

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.log(
      `[OnQueueActive] Processing job ${job.id} of type ${job.name} with data ${JSON.stringify(job.data)}`,
    );
  }

  @OnQueueCompleted()
  onCompleted(job: Job, result) {
    this.logger.log(
      `[OnQueueCompleted] Processing job ${job.id} of type ${job.name} with result ${JSON.stringify(result)}`,
    );
  }
  @OnQueueError()
  onError(error) {
    this.logger.error(error.message, error.stack);
  }
}