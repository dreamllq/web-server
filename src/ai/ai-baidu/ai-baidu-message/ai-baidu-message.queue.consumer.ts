import { OnQueueActive, OnQueueCompleted, OnQueueError, Process, Processor } from '@nestjs/bull';
import { DoneCallback, Job } from 'bull';
import { Logger } from '@nestjs/common';
import { AiBaiduMessageService } from './ai-baidu-message.service';

@Processor('aiBaiduMessage')
export class AiBaiduMessageQueueConsumer {
  private logger = new Logger('AiBaiduMessageQueueConsumer');
  constructor(
    private readonly aiBaiduMessageService:AiBaiduMessageService,
  ) {}

  @Process({ name: 'chatMessage' })
  async chatMessage(job: Job<any>, done: DoneCallback) {
    this.logger.log(`[chatMessage] ${JSON.stringify(job.data)}`);
    const result = await this.aiBaiduMessageService.createAiResponse({ mid: job.data.mid });
    done(null, result);
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