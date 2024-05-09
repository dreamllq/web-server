import { Injectable, Logger } from '@nestjs/common';
import { AiBaiduMessage } from './entities/ai-baidu-message.entity';
const sdk = require('@baiducloud/sdk');

@Injectable()
export class AiBaiduMessageSdkService {
  private logger = new Logger('AiBaiduMessageSdkService');

  constructor(
  ) {}

  async chat(message:AiBaiduMessage):Promise<{
    created: string,
    id: string,
    is_truncated: boolean,
    need_clear_history: boolean,
    object: string,
    result: string,
    usage: {prompt_tokens: number, completion_tokens: number, total_tokens: number}
  }> {
    // const message = await this.aiBaiduMessageService.findOne(data.mid);
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
          if (response.body.error_code) {
            this.logger.log(`[chat][sendRequest][error] ${JSON.stringify(response.body)}`);
            reject(new Error(response.body.error_msg));
          } else {
            this.logger.log(`[chat][sendRequest][success] ${JSON.stringify(response.body)}`);
            resolve(response.body);
          }
        }, (error) => {
          this.logger.log(`[chat][sendRequest][error] ${JSON.stringify(error)}`);
          reject(error);
        });
    });
  }
}
