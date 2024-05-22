import { Injectable, Logger } from '@nestjs/common';
import { AiAliyunMessage } from './entities/ai-aliyun-message.entity';
import axios from 'axios';

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
    this.logger.log(`[message] ${JSON.stringify(message)}`);
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
}
