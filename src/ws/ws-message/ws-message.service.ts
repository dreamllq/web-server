
import { Injectable, Logger } from '@nestjs/common';
import { Namespace } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class WsMessageService {
  private namespace: Namespace;
  private logger = new Logger('WsMessageService');

  setNamespace(ns: Namespace) {
    this.namespace = ns;
  }

  async send(to: string, data:any) {
    const wid = uuidv4();
    try {
      return await this.namespace.to(to).timeout(10000).emitWithAck('message', {
        wid: wid,
        ...data 
      });
    } catch (e) {
      this.logger.error(e.message, e.stack);
    }
  }
}