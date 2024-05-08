import { Injectable, Logger } from '@nestjs/common';
import { AiBaiduMessageService } from './ai-baidu-message.service';
const sdk = require('@baiducloud/sdk');

@Injectable()
export class AiBaiduMessageSdkService {
  private logger = new Logger('AiBaiduMessageSdkService');

  constructor(
   private readonly aiBaiduMessageService:AiBaiduMessageService
  ) {}

  async chat(data:{mid: string}) {
    const message = await this.aiBaiduMessageService.findOne(data.mid);
    this.logger.log(`[message] ${JSON.stringify(message)}`);
    return new Promise((resolve, reject) => {
      const config = {
        credentials: {
          ak: message.session.account.accessKey,
          sk: message.session.account.secretKey
        },
        endpoint: message.session.service.endpoint
      };
    
      const client = new sdk.HttpClient(config);
      const path = message.session.service.path;
      const body = JSON.stringify({
        'messages': [
          {
            'role': message.role,
            'content': message.content
          }
        ]
      });
    
      const params = {};
      const headers = { 'Content-Type': 'application/json' };
      this.logger.log(`[chat][sendRequest][before] ${JSON.stringify({
        path,
        body,
        headers,
        params 
      })}`);
      client.sendRequest('POST', path, body, headers, params)
        .then((response) => {
          // console.log('object: ', response.body);
          this.logger.log(`[chat][sendRequest][success] ${JSON.stringify(response.body)}`);
          resolve(response.body);
        }, (error) => {
          this.logger.log(`[chat][sendRequest][error] ${JSON.stringify(error)}`);
          reject(error);
        });
    });
  }
}
