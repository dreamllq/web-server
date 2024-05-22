import { Injectable, Logger } from '@nestjs/common';
import { AiAliyunMessage } from './entities/ai-aliyun-message.entity';
const sdk = require('@baiducloud/sdk');
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
    // const message = await this.aiBaiduMessageService.findOne(data.mid);
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

    // return new Promise((resolve, reject) => {
    //   const config = {
    //     credentials: {
    //       ak: message.session.account.accessKey,
    //       sk: message.session.account.secretKey
    //     },
    //     endpoint: message.session.service.endpoint
    //   };
    
    //   const client = new sdk.HttpClient(config);
    //   const path = message.session.service.path;
    //   const body = JSON.stringify({ 'messages': messages });
    
    //   const params = {};
    //   const headers = { 'Content-Type': 'application/json' };
    //   this.logger.log(`[chat][sendRequest][before] ${JSON.stringify({
    //     path,
    //     body,
    //     headers,
    //     params 
    //   })}`);
    //   client.sendRequest('POST', path, body, headers, params)
    //     .then((response) => {
    //       if (response.body.error_code) {
    //         this.logger.log(`[chat][sendRequest][error] ${JSON.stringify(response.body)}`);
    //         reject(new Error(response.body.error_msg));
    //       } else {
    //         this.logger.log(`[chat][sendRequest][success] ${JSON.stringify(response.body)}`);
    //         resolve(response.body);
    //       }
    //     }, (error) => {
    //       this.logger.log(`[chat][sendRequest][error] ${JSON.stringify(error)}`);
    //       reject(error);
    //     });
    // });
  }
}
