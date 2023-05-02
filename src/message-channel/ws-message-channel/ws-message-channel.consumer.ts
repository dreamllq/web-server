import { OnQueueActive, OnQueueCompleted, OnQueueError, Process, Processor } from '@nestjs/bull';
import { DoneCallback, Job } from 'bull';
import { Logger } from '@nestjs/common';
import { WsMessageService } from 'src/ws/ws-message/ws-message.service';

@Processor('wsMessage')
export class WsMessageChannelConsumer {
  private logger = new Logger('WsMessageChannelConsumer');
  constructor(private readonly wsMessageService: WsMessageService) {}

  @Process({ name: 'sendMessage' })
  async sendMessage(job: Job<any>, done: DoneCallback) {
    this.logger.log(`[sendMessage] ${JSON.stringify(job.data)}`);
    const result = await this.wsMessageService.send(job.data.to, job.data);
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