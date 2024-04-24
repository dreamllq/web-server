import { OnQueueActive, OnQueueCompleted, OnQueueError, Process, Processor } from '@nestjs/bull';
import { DoneCallback, Job } from 'bull';
import { Logger } from '@nestjs/common';

@Processor('wxMessage')
export class WxMessageChannelConsumer {
  private logger = new Logger('WxMessageChannelConsumer');

  @Process({ name: 'sendMessage' })
  async sendMessage(job: Job<any>, done: DoneCallback) {
    this.logger.log(`[sendMessage] ${JSON.stringify(job.data)}`);
    // const result = await this.wxMessageService.send(job.data.to, job.data);
    // done(null, result);
    done(null, {});
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