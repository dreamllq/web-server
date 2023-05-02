export enum MsgTypeEnum {
  Event = 'event'
}

export enum EventTypeEventEnum {
  Subscribe = 'subscribe',
  Unsubscribe = 'unsubscribe',
  Scan = 'SCAN',
  Location = 'LOCATION',
  Click = 'CLICK',
  View = 'VIEW',
  TemplatesEndJobFinish = 'TEMPLATESENDJOBFINISH'
}

export interface SubscribeNotify{
  ToUserName: string,
  FromUserName: string,
  CreateTime: string,
  MsgType: string,
  Event:string
}

export type UnsubscribeNotify = SubscribeNotify