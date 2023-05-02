export enum MallOrderStatusEnum {
  Unknown = -1,
  WaitPay = 0, // 待支付
  WaitDeliver = 1, // 待发货
  Delivered = 2, // 已发货
  WaitExpress = 3, // 待配送
  Received = 4, // 已收货
  Done = 5, // 已完成
  UnPayClose = 6, // 已关闭
}

interface GoodInfo{
  goodId: string;
  count: number;
}
export interface CreateOrderData {
  creatorId: string,
  addressId: string,
  goods: GoodInfo[]
}
