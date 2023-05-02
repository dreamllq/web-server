import { Body, Controller, Delete, Get, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { WeixinPayCenterService } from './weixin-pay-center.service';
import { WeixinPayCenterGetPayParamsDto } from './dtos/get-pay-params.dto';
import { SuccessResult } from 'src/common-model';
import { WeixinPayCenterGetPayParamsResponse } from './responses/get-pay-params.res';

@ApiTags('weixin-official-account')
@UseInterceptors(new TransformInterceptor())
@Controller('weixin-platform/pay-center')
export class WeixinPayCenterController {
  constructor(
    private readonly weixinPayCenterService:WeixinPayCenterService
  ) {}

  @ApiOperation({
    summary: '获取微信JSSDK支付参数(自动下单, 兼容小程序)',
    operationId: 'getPayParams'
  })
  @ApiParam({ name: 'appid' })
  @ApiParam({ name: 'mchid' })
  @ApiOkResponse({ type: WeixinPayCenterGetPayParamsResponse })
  @UseGuards(AuthGuard('jwt'))
  @Post('payParams/:appid/:mchid')
  getPayParams(@Param('appid') appid, @Param('mchid') mchid, @Body() dto:WeixinPayCenterGetPayParamsDto) {
    return this.weixinPayCenterService.getPayParams(appid, mchid, dto);
  }
}
