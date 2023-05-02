export interface GetPayParamsResult {
  appid: string,
  time_stamp: string,
  nonce_str: string,
  package: string,
  sign_type: string
}

export interface GetPayParamsByPrepayArgs {
  sub_appid?: string,
  prepay_id: string,
  sign_type?: string
}

export interface UnifiedOrderArgs{
  out_trade_no: string,
  body:string, 
  total_fee:number, 
  openid: string,
  sign_type?: string,
  notify_url?: string,
  spbill_create_ip?: string,
  trade_type?:string
}

export interface GetPayParamsArgs extends UnifiedOrderArgs {
  trade_type?: string,
  sign_type?: string
}

export interface GetAppParamsArgs extends UnifiedOrderArgs {
  trade_type?: string,
  sign_type?: string
}

export interface GetAppParamsByPrepayArgs{
  sub_appid?:string,
  sub_mch_id?:string,
  prepay_id?:string,
}

export interface GetAppParamsByPrepayResult{
  appid:string,
  partnerid: string,
  prepayid: string,
  package: string,
  noncestr: string,
  timestamp: string,
  sign: string
}

export interface GetNativeUrlArgs {
  product_id: string
}

export interface MicropayArgs{
  out_trade_no: string,
  body:string, 
  total_fee:number, 
  auth_code: string,
  sign_type?:string,
  spbill_create_ip?:string
}

export interface UnifiedOrderResult {
  prepay_id:string,
  sub_appid?:string
}

export interface OrderQueryArgs{
  transaction_id?:string,
  out_trade_no?: string,
  sign_type?:string
}

export interface ReverseArgs{
  transaction_id?:string,
  out_trade_no?: string,
  sign_type?:string
}

export interface CloseOrderArgs{
  out_trade_no: string,
  sign_type?:string
}

export interface RefundArgs{
  transaction_id?:string,
  out_trade_no?:string,
  out_refund_no: string,
  total_fee: string,
  refund_fee: string,
  sign_type?:string,
  op_user_id?:string,
  notify_url?:string
}

export interface RefundQueryArgs{
  sign_type?:string,
  transaction_id?:string,
  out_trade_no?:string,
  refund_id?: string,
  out_refund_no?:string
}

export interface DownloadBillArgs{
  sign_type?:string,
  bill_type?:string,
  bill_date:string
}

export interface DownloadFundflowArgs{
  sign_type?:string,
  bill_type?:string,
  bill_date:string
}

export interface SendCouponArgs{
  openid_count?: number,
  coupon_stock_id: string,
  partner_trade_no: string,
  openid: string
}

export interface QueryCouponStockArgs{
  coupon_stock_id: string
}

export interface QueryCouponInfoArgs{
  coupon_id: string,
  openid: string,
  stock_id: string
}

export interface TransfersArgs{
  check_name?:string,
  spbill_create_ip?:string,
  partner_trade_no: string,
  openid: string,
  re_user_name: string,
  amount: string,
  desc: string
}

export interface TransfersQueryArgs{
  partner_trade_no: string
}

export interface PayBankArgs{
  partner_trade_no?: string,
  bank_code?:string,
  enc_bank_no?:string,
  enc_true_name?:string,
  amount?:string,
  desc?:string
}

export interface QueryBankArgs{
  partner_trade_no: string
}

export interface SendRedpackArgs{
  mch_billno?:string,
  mch_autono?:string,
  send_name: string,
  re_openid: string,
  total_amount: string,
  wishing: string,
  act_name: string,
  remark: string,
  client_ip?:string,
  total_num?: number
}

export interface SendGroupRedpackArgs{
  mch_billno?:string,
  mch_autono?:string,
  send_name: string,
  re_openid: string,
  total_amount: string,
  wishing: string,
  act_name: string,
  remark: string,
  total_num?: number,
  amt_type?:string
}

export interface RedpackQueryArgs{
  bill_type?:string,
  mch_billno: string
}