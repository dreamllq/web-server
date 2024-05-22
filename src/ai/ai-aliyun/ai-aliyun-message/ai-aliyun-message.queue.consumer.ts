import { OnQueueActive, OnQueueCompleted, OnQueueError, Process, Processor } from '@nestjs/bull';
import { DoneCallback, Job } from 'bull';
import { Logger } from '@nestjs/common';
import { AiAliyunMessageService } from './ai-aliyun-message.service';

@Processor('aiAliyunMessage')
export class AiAliyunMessageQueueConsumer {
  private logger = new Logger('AiAliyunMessageQueueConsumer');
  constructor(
    private readonly aiAliyunMessageService:AiAliyunMessageService,
  ) {}

  @Process({ name: 'chatMessage' })
  async chatMessage(job: Job<any>, done: DoneCallback) {
    this.logger.log(`[chatMessage] ${JSON.stringify(job.data)}`);
    const result = await this.aiAliyunMessageService.createAiResponse({ mid: job.data.mid });
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