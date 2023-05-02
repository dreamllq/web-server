import { Controller, Get, Redirect, Session, Request, Param, Query } from '@nestjs/common';
import { WeixinOfficialAccountOauthService } from './weixin-official-account-oauth.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('weixin-official-account-oauth')
@Controller('weixin-platform/official-account-oauth')
export class WeixinOfficialAccountOauthController {
  constructor(
    private readonly weixinOfficialAccountOauthService:WeixinOfficialAccountOauthService
  ) {}

  @ApiParam({ name: 'appid' })
  @Get('oauth-jump/info/:appid')
  @Redirect()
  async oauthJumpInfo(@Session() session, @Query('redirect_url') redirectUrl, @Param('appid') appid) {
    const url = await this.weixinOfficialAccountOauthService.snsUserInfoUrl(appid, redirectUrl);
    return {
      url,
      statusCode: 302 
    };
  }
  
  @ApiParam({ name: 'appid' })
  @Get('oauth-jump/base/:appid')
  @Redirect()
  async oauthJumpBase(@Session() session, @Query('redirect_url') redirectUrl, @Param('appid') appid) {
    const url = await this.weixinOfficialAccountOauthService.snsUserBaseUrl(appid, redirectUrl);
    return {
      url,
      statusCode: 302 
    };
  }
}
