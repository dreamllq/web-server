import { Injectable, Logger } from '@nestjs/common';
import { AiAliyunMessage } from './entities/ai-aliyun-message.entity';
import axios from 'axios';

const delay = (ms:number) => new Promise(resolve => setTimeout(resolve, ms));
@Injectable()
export class AiAliyunMessageSdkService {
  private logger = new Logger('AiAliyunMessageSdkService');

  constructor(
  ) {}

  async chat(message:AiAliyunMessage, messages:{role:string, content:string}[]):Promise<{
    output:{text: string, finish_reason:string},
    usage:{output_tokens:number, input_tokens: number},
    request_id: string
  }> {
    this.logger.log(`[chat][message] ${JSON.stringify(message)}`);
    try {
      const response = await axios.post(`${message.session.service.endpoint}${message.session.service.path}`, {
        model: message.session.service.model,
        input: { messages },
        parameters: {}
      }, {
        headers: {
          'Authorization': `Bearer ${message.session.account.dashscopeApiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.code) {
        throw new Error(response.data.message);
      } else {
        this.logger.log(`[chat][sendRequest][success] ${JSON.stringify(response.data)}`);
        return response.data;
      }
    } catch (e) {
      this.logger.log(`[chat][sendRequest][error] ${JSON.stringify(e)}`);
      throw e;
    }
  }

  async messageToImage(message:AiAliyunMessage):Promise<{
    output:{text: string, finish_reason:string},
    usage:{output_tokens:number, input_tokens: number},
    request_id: string
  }> {
    this.logger.log(`[messageToImage][message] ${JSON.stringify(message)}`);
    try {
      const response = await axios.post(`${message.session.service.endpoint}${message.session.service.path}`, {
        model: message.session.service.model,
        input: { 'prompt': message.content },
        'parameters': { 'n': 1 }
      }, {
        headers: {
          'Authorization': `Bearer ${message.session.account.dashscopeApiKey}`,
          'Content-Type': 'application/json',
          'X-DashScope-Async': 'enable'
        }
      });

      if (response.data.code) {
        throw new Error(response.data.message);
      } else {
        this.logger.log(`[messageToImage][sendRequest][success] ${JSON.stringify(response.data)}`);
        const taskResult = await this.getTaskResult(response.data.output.task_id, message);
        this.logger.log(`[messageToImage][getTaskResult][success] ${JSON.stringify(taskResult)}`);
        const text = taskResult.output.results.reduce((acc, item) => {
          acc += `![image](${item.url})\n\n`;
          return acc;
        }, '');

        return { output: { text } } as any;
      }
    } catch (e) {
      this.logger.log(`[messageToImage][sendRequest][error] ${JSON.stringify(e)}`);
      throw e;
    }
  }

  async getTaskResult (taskId:string, message: AiAliyunMessage) {
    this.logger.log(`[getTaskResult][taskId] ${taskId}`);
    const response = await axios.get(`https://dashscope.aliyuncs.com/api/v1/tasks/${taskId}`, { headers: { 'Authorization': `Bearer ${message.session.account.dashscopeApiKey}` } });

    this.logger.log(`[getTaskResult][sendRequest][success] ${JSON.stringify(response.data)}`);
    if (response.data.output.task_status === 'RUNNING' || response.data.output.task_status === 'PENDING') {
      await delay(10 * 1000);
      return await this.getTaskResult(taskId, message);
    } else if (response.data.output.task_status === 'SUCCEEDED') {
      return response.data;
    } else {
      throw new Error(response.data.output.message);
    }
  }
}
