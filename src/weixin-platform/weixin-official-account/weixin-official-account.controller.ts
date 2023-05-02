import { Body, Controller, Delete, Get, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { WeixinOfficialAccountService } from './weixin-official-account.service';
import { GetJssdkSignatureDto } from './dtos/get-jssdk-signature.dto';
import { DeleteSuccessResult } from 'src/common-model';
import { SendTemplateDto } from './dtos/send-template.dto';
import { WeixinOfficialAccountGetAccessTokenResponse } from './responses/get-access-token.res';
import { WeixinOfficialAccountGetNotifyUrlResponse } from './responses/get-notify-url.res';

@ApiTags('weixin-official-account')
@UseInterceptors(new TransformInterceptor())
@Controller('weixin-platform/official-account')
export class WeixinOfficialAccountController {
  constructor(private readonly weixinOfficialAccountService:WeixinOfficialAccountService) {}

  @ApiOperation({
    summary: '获取accessToken',
    operationId: 'getAccessToken'
  })
  @ApiParam({ name: 'appid' })
  @ApiOkResponse({ type: WeixinOfficialAccountGetAccessTokenResponse })
  @Get('getAccessToken/:appid')
  async getAccessToken(@Param('appid') appid) {
    return this.weixinOfficialAccountService.getAccessToken(appid);
  }

  @ApiOperation({
    summary: '获取公众号接收消息地址',
    operationId: 'getNotifyUrl'
  })
  @ApiParam({ name: 'appid' })
  @ApiOkResponse({ type: WeixinOfficialAccountGetNotifyUrlResponse })
  @Get('getNotifyUrl/:appid')
  getNotifyUrl(@Param('appid') appid) {
    return process.env.PROTOCOL + '://' + process.env.HOST + `/api/weixin-platform/official-account/notify/${appid}`;
  }

  @ApiOperation({
    summary: '获取jssdk 认证签名',
    operationId: 'getJssdkSignature'
  })
  @ApiParam({ name: 'appid' })
  @Post('jssdk/get-signature/:appid')
  async getJssdkSignature(@Body() getJssdkSignatureDto:GetJssdkSignatureDto, @Param('appid') appid) {
    const signatureData = this.weixinOfficialAccountService.getJssdkSignature(appid, getJssdkSignatureDto);
    return signatureData;
  }

  @ApiOperation({
    summary: '获取所有模板列表',
    operationId: 'getTemplates' 
  })
  @ApiParam({ name: 'appid' })
  @UseGuards(AuthGuard('jwt'))
  @Get('templates/:appid')
  async getTemplates(@Param('appid') appid) {
    const data = await this.weixinOfficialAccountService.getAllPrivateTemplate(appid);
    return data.template_list;
  }

  @ApiOperation({
    summary: '删除模板',
    operationId: 'removeTemplate'
  })
  @ApiParam({ name: 'id' })
  @ApiParam({ name: 'appid' })
  @ApiOkResponse({ type: DeleteSuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Delete('templates/:id/:appid')
  removeTemplate(@Param('id') templateId, @Param('appid') appid) {
    return this.weixinOfficialAccountService.delPrivateTemplate(appid, templateId);
  }

  @ApiOperation({
    summary: '发送模板',
    operationId: 'send'
  })
  @ApiParam({ name: 'appid' })
  @UseGuards(AuthGuard('jwt'))
  @Post('send/:appid')
  async send(@Body() sendTemplateDto: SendTemplateDto, @Param('appid') appid) {
    return await this.weixinOfficialAccountService.sendTemplate(appid, sendTemplateDto);
  }
}
