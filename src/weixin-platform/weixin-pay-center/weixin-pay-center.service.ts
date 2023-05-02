import { Injectable } from '@nestjs/common';
import { WeixinPayService } from 'src/weixin/weixin-pay/weixin-pay.service';
import { CloseOrderArgs, DownloadBillArgs, DownloadFundflowArgs, GetAppParamsArgs, GetAppParamsByPrepayArgs, GetAppParamsByPrepayResult, GetNativeUrlArgs, GetPayParamsArgs, GetPayParamsByPrepayArgs, GetPayParamsResult, MicropayArgs, OrderQueryArgs, PayBankArgs, QueryBankArgs, QueryCouponInfoArgs, QueryCouponStockArgs, RedpackQueryArgs, RefundArgs, RefundQueryArgs, ReverseArgs, SendCouponArgs, SendGroupRedpackArgs, SendRedpackArgs, TransfersArgs, TransfersQueryArgs, UnifiedOrderArgs, UnifiedOrderResult } from './weixin-pay-center.type';
import { FileService } from 'src/file/file.service';
const tenpay = require('tenpay');

@Injectable()
export class WeixinPayCenterService {
  constructor(
    private readonly weixinPayService:WeixinPayService,
    private readonly fileService:FileService
  ) {}

  async getClient(appid: string, mchid: string) {
    const weixinPay = await this.weixinPayService.findOneByMchid(mchid);
    const file = await this.fileService.findOne(weixinPay.pfx);
    const config = {
      appid: appid,
      mchid: mchid,
      partnerKey: weixinPay.partnerKey,
      pfx: file.content,
      notify_url: weixinPay.notifyUrl,
      spbill_create_ip: weixinPay.spbillCreateIp
    };
    return new tenpay(config);
  }

  /**
   * 获取微信JSSDK支付参数(自动下单, 兼容小程序)
   * 
    let result = await api.getPayParams({
      out_trade_no: '商户内部订单号',
      body: '商品简单描述',
      total_fee: '订单金额(分)',
      openid: '付款用户的openid'
    });
   */
  async getPayParams(appid: string, mchid: string, options:GetPayParamsArgs): Promise<GetPayParamsResult> {
    const client = await this.getClient(appid, mchid);
    const result = await client.getPayParams({
      out_trade_no: options.out_trade_no,
      body: options.body,
      total_fee: options.total_fee,
      openid: options.openid
    });

    return result;
  }

  /**
   * 获取微信JSSDK支付参数(通过预支付会话标识, 兼容小程序)
   * // 该方法需先调用api.unifiedOrder统一下单, 获取prepay_id;
    let result = await api.getPayParamsByPrepay({
      prepay_id: '预支付会话标识'
    });
   */
  async getPayParamsByPrepay(appid: string, mchid: string, options:GetPayParamsByPrepayArgs): Promise<GetPayParamsResult> {
    const client = await this.getClient(appid, mchid);
    const result = await client.getPayParamsByPrepay({
      prepay_id: options.prepay_id,
      sub_appid: options.sub_appid
    }, options.sign_type);

    return result;
  }

  /**
   * 获取APP支付参数(自动下单)
   * let result = await api.getAppParams({
        out_trade_no: '商户内部订单号',
        body: '商品简单描述',
        total_fee: '订单金额(分)'
      });
   */
  async getAppParams(appid: string, mchid: string, options:GetAppParamsArgs) {
    const client = await this.getClient(appid, mchid);
    const result = await client.getAppParams({
      out_trade_no: options.out_trade_no,
      body: options.body,
      total_fee: options.total_fee,
      openid: options.openid
    });
    return result;
  }


  /**
   * 获取APP支付参数(通过预支付会话标识)
   * 
   * // 该方法需先调用api.unifiedOrder统一下单<注意传入trade_type: 'APP'>, 获取prepay_id;
    let result = await api.getAppParamsByPrepay({
      prepay_id: '预支付会话标识'
    });
   */
  async getAppParamsByPrepay(appid: string, mchid: string, options:GetAppParamsByPrepayArgs): Promise<GetAppParamsByPrepayResult> {
    const client = await this.getClient(appid, mchid);
    const result = await client.getAppParamsByPrepay({ prepay_id: options.prepay_id });
    return result;
  }

  /**
   * 扫码支付(模式一)
   * let result = await api.getNativeUrl({
      product_id: '商品ID'
    });
    扫码支付(模式二)
    // 使用统一下单API可直接获取code_url, 需自行生成二维码图片
    let {prepay_id, code_url} = await api.unifiedOrder({
      out_trade_no: '商户内部订单号',
      body: '商品简单描述',
      total_fee: '订单金额(分)',
      openid: '用户openid',
      trade_type: 'NATIVE',
      product_id: '商品id'
    });
   */
  async getNativeUrl(appid: string, mchid: string, options:GetNativeUrlArgs): Promise<string> {
    const client = await this.getClient(appid, mchid);
    const result = await client.getNativeUrl({ product_id: options.product_id });
    return result;
  }

  /**
   * 刷卡支付
   * let result = await api.micropay({
      out_trade_no: '商户内部订单号',
      body: '商品简单描述',
      total_fee: '订单金额(分)',
      auth_code: '授权码'
    });
   */
  async micropay(appid: string, mchid: string, options:MicropayArgs) {
    const client = await this.getClient(appid, mchid);
    const result = await client.micropay({ 
      out_trade_no: options.out_trade_no,
      body: options.body,
      total_fee: options.total_fee,
      auth_code: options.auth_code
    });
    return result;
  }

  /**
   * 微信统一下单
   * let result = await api.unifiedOrder({
      out_trade_no: '商户内部订单号',
      body: '商品简单描述',
      total_fee: '订单金额(分)',
      openid: '用户openid'
    });
   */
  async unifiedOrder(appid: string, mchid: string, options:UnifiedOrderArgs): Promise<UnifiedOrderResult> {
    const client = await this.getClient(appid, mchid);
    const result = await client.unifiedOrder({
      out_trade_no: options.out_trade_no,
      body: options.body,
      total_fee: options.total_fee,
      openid: options.openid
    });
    return result;
  }

  /**
   * 查询订单
   * let result = await api.orderQuery({
      // transaction_id, out_trade_no 二选一
      // transaction_id: '微信的订单号',
      out_trade_no: '商户内部订单号'
    });
   */
  async orderQuery(appid: string, mchid: string, options:OrderQueryArgs) {
    const client = await this.getClient(appid, mchid);
    const result = await client.orderQuery({
      transaction_id: options.transaction_id,
      out_trade_no: options.out_trade_no
    });
    return result;
  }

  /**
   * 撤消订单
   * let result = await api.reverse({
      // transaction_id, out_trade_no 二选一
      // transaction_id: '微信的订单号',
      out_trade_no: '商户内部订单号'
    });
   */
  async reverse(appid: string, mchid: string, options:ReverseArgs) {
    const client = await this.getClient(appid, mchid);
    const result = await client.reverse({
      transaction_id: options.transaction_id,
      out_trade_no: options.out_trade_no
    });
    return result;
  }

  /**
   * 关闭订单
   * let result = await api.closeOrder({
      out_trade_no: '商户内部订单号'
    });
   */
  async closeOrder(appid: string, mchid: string, options:CloseOrderArgs) {
    const client = await this.getClient(appid, mchid);
    const result = await client.closeOrder({ out_trade_no: options.out_trade_no });
    return result;
  }

  /**
   * 申请退款
   * let result = await api.refund({
      // transaction_id, out_trade_no 二选一
      // transaction_id: '微信的订单号',
      out_trade_no: '商户内部订单号',
      out_refund_no: '商户内部退款单号',
      total_fee: '订单金额(分)',
      refund_fee: '退款金额(分)'
    });
   */
  async refund(appid: string, mchid: string, options:RefundArgs) {
    const client = await this.getClient(appid, mchid);
    const result = await client.refund({
      transaction_id: options.transaction_id,
      out_trade_no: options.out_trade_no,
      out_refund_no: options.out_refund_no,
      total_fee: options.total_fee,
      refund_fee: options.refund_fee
    });
    return result;
  }

  /**
   * 查询退款
   * let result = await api.refundQuery({
      // 以下参数 四选一
      // transaction_id: '微信的订单号',
      // out_trade_no: '商户内部订单号',
      // out_refund_no: '商户内部退款单号',
      refund_id: '微信退款单号'
    });
   */
  async refundQuery(appid: string, mchid: string, options:RefundQueryArgs) {
    const client = await this.getClient(appid, mchid);
    const result = await client.refundQuery({
      transaction_id: options.transaction_id,
      out_trade_no: options.out_trade_no,
      out_refund_no: options.out_refund_no,
      refund_id: options.refund_id
    });
    return result;
  }

  /**
   * 下载对帐单
   */
  /**
   * 新增一个format参数(默认: false), 用于自动转化帐单为json格式
   * json.total_title: 统计数据的标题数组 - ["总交易单数","总交易额","总退款金额", ...],
   * json.total_data: 统计数据的数组 - ["3", "88.00", "0.00", ...],
   * json.list_title: 详细数据的标题数组 - ["﻿交易时间","公众账号ID","商户号", ...],
   * json.list_data: 详细数据的二维数据 - [["2017-12-26 19:20:39","wx12345", "12345", ...], ...]
   * let result = await api.downloadBill({
        bill_date: '账单日期'
      }, true);
  */
  async downloadBill(appid: string, mchid: string, options:DownloadBillArgs) {
    const client = await this.getClient(appid, mchid);
    const result = await client.downloadBill({ bill_date: options.bill_date }, true);
    return result;
  }

  /**
   * 下载资金帐单
   */
  /**
 * 新增一个format参数(默认: false), 用于自动转化帐单为json格式
 * json.total_title: 统计数据的标题数组 - ["资金流水总笔数","收入笔数","收入金额", ...],
 * json.total_data: 统计数据的数组 - ["20.0", "17.0", "0.35", ...],
 * json.list_title: 详细数据的标题数组 - ["记账时间","微信支付业务单号","资金流水单号", ...],
 * json.list_data: 详细数据的二维数据 - [["2018-02-01 04:21:23","12345", "12345", ...], ...]
  let result = await api.downloadFundflow({
    bill_date: '账单日期'
  }, true);
 */
  async downloadFundflow(appid: string, mchid: string, options:DownloadFundflowArgs) {
    const client = await this.getClient(appid, mchid);
    const result = await client.downloadFundflow({ bill_date: options.bill_date }, true);
    return result;
  }

  /**
   * 发放代金券
   * let result = await api.sendCoupon({
      coupon_stock_id: '代金券批次id',
      partner_trade_no: '商户单据号',
      openid: '用户openid'
    });
   */
  async sendCoupon(appid: string, mchid: string, options:SendCouponArgs) {
    const client = await this.getClient(appid, mchid);
    const result = await client.sendCoupon({
      coupon_stock_id: options.coupon_stock_id,
      partner_trade_no: options.partner_trade_no,
      openid: options.openid
    });
    return result;
  }

  /**
   * 查询代金券批次
   * let result = await api.queryCouponStock({
      coupon_stock_id: '代金券批次id'
    });
   */
  async queryCouponStock(appid: string, mchid: string, options:QueryCouponStockArgs) {
    const client = await this.getClient(appid, mchid);
    const result = await client.queryCouponStock({ coupon_stock_id: options.coupon_stock_id });
    return result;
  }

  /**
   * 查询代金券信息
   * let result = await api.queryCouponInfo({
      coupon_id: '代金券id',
      openid: '用户openid',
      stock_id: '批次号'
    });
   */
  async queryCouponInfo(appid: string, mchid: string, options:QueryCouponInfoArgs) {
    const client = await this.getClient(appid, mchid);
    const result = await client.queryCouponInfo({
      coupon_id: options.coupon_id,
      openid: options.openid,
      stock_id: options.stock_id
    });
    return result;
  }

  /**
   * 企业付款
   * let result = await api.transfers({
    partner_trade_no: '商户内部付款订单号',
    openid: '用户openid',
    re_user_name: '用户真实姓名',
    amount: '付款金额(分)',
    desc: '企业付款描述信息'
  });
   */
  async transfers(appid: string, mchid: string, options:TransfersArgs) {
    const client = await this.getClient(appid, mchid);
    const result = await client.transfers({
      partner_trade_no: options.partner_trade_no,
      openid: options.openid,
      re_user_name: options.re_user_name,
      amount: options.amount,
      desc: options.desc
    });
    return result;
  }

  /**
   * 查询企业付款
   * let result = await api.transfersQuery({
      partner_trade_no: '商户内部付款订单号'
    });
   */
  async transfersQuery(appid: string, mchid: string, options:TransfersQueryArgs) {
    const client = await this.getClient(appid, mchid);
    const result = await client.transfersQuery({ partner_trade_no: options.partner_trade_no });
    return result;
  }

  /**
   * 企业付款到银行卡
   * let result = await api.payBank({
      partner_trade_no: '商户内部付款订单号',
      bank_code: '收款方开户行',
      enc_bank_no: '收款方银行卡号',
      enc_true_name: '收款方用户名',
      amount: '付款金额(分)',
      desc: '企业付款到银行卡描述信息'
    });
   */
  async payBank(appid: string, mchid: string, options:PayBankArgs) {
    const client = await this.getClient(appid, mchid);
    const result = await client.payBank({
      partner_trade_no: options.partner_trade_no,
      bank_code: options.bank_code,
      enc_bank_no: options.enc_bank_no,
      enc_true_name: options.enc_true_name,
      amount: options.amount,
      desc: options.desc
    });
    return result;
  }

  /**
   * 查询企业付款到银行卡
   * let result = await api.queryBank({
      partner_trade_no: '商户内部付款订单号'
    });
   */
  async queryBank(appid: string, mchid: string, options:QueryBankArgs) {
    const client = await this.getClient(appid, mchid);
    const result = await client.queryBank({ partner_trade_no: options.partner_trade_no });
    return result;
  }

  /**
   * 发放普通红包
   * let result = await api.sendRedpack({
      // mch_billno, mch_autono 二选一
      // mch_billno: '商户内部付款订单号',
      mch_autono: '10位当日唯一数字, 用于自动生成mch_billno',
      send_name: '商户名称',
      re_openid: '用户openid',
      total_amount: '红包金额(分)',
      wishing: '红包祝福语',
      act_name: '活动名称',
      remark: '备注信息'
    });
   */
  async sendRedpack(appid: string, mchid: string, options:SendRedpackArgs) {
    const client = await this.getClient(appid, mchid);
    const result = await client.sendRedpack({
      // mch_billno, mch_autono 二选一
      mch_billno: options.mch_billno,
      mch_autono: options.mch_autono,
      send_name: options.send_name,
      re_openid: options.re_openid,
      total_amount: options.total_amount,
      wishing: options.wishing,
      act_name: options.act_name,
      remark: options.remark
    });
    return result;
  }

  /**
   * 发放裂变红包
   * let result = await api.sendGroupRedpack({
      // mch_billno, mch_autono 二选一
      // mch_billno: '商户内部付款订单号',
      mch_autono: '10位当日唯一数字, 用于自动生成mch_billno',
      send_name: '商户名称',
      re_openid: '种子用户openid',
      total_amount: '红包金额(分)',
      wishing: '红包祝福语',
      act_name: '活动名称',
      remark: '备注信息'
    });
   */
  async sendGroupRedpack(appid: string, mchid: string, options:SendGroupRedpackArgs) {
    const client = await this.getClient(appid, mchid);
    const result = await client.sendGroupRedpack({
      // mch_billno, mch_autono 二选一
      mch_billno: options.mch_billno,
      mch_autono: options.mch_autono,
      send_name: options.send_name,
      re_openid: options.re_openid,
      total_amount: options.total_amount,
      wishing: options.wishing,
      act_name: options.act_name,
      remark: options.remark
    });
    return result;
  }

  /**
   * 查询红包记录
   * api.redpackQuery({
      mch_billno: '商户内部付款订单号'
    });
   */
  async redpackQuery(appid: string, mchid: string, options:RedpackQueryArgs) {
    const client = await this.getClient(appid, mchid);
    const result = client.redpackQuery({ mch_billno: options.mch_billno });
    return result;
  }
}
