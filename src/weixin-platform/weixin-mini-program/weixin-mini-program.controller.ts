import { Controller, Get, Param, Post, Query, UseGuards, UseInterceptors, Request } from '@nestjs/common';
import { WeixinMiniProgramService } from './weixin-mini-program.service';
import { ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { GetPhoneNumberResponse } from './responses/getPhoneNumber.res';
import { AuthGuard } from '@nestjs/passport';
import { getUserEncryptKeyResponse } from './responses/getUserEncryptKey.res';
import { WeixinMiniProgramCodeToSessionResponse } from './responses/code-to-session.res';

@ApiTags('weixin-mini-program')
@UseInterceptors(new TransformInterceptor())
@Controller('weixin-platform/mini-program')
export class WeixinMiniProgramController {
  constructor(
    private readonly weixinMiniProgramService: WeixinMiniProgramService,
  ) {}

  @ApiOperation({
    operationId: 'getPhoneNumber',
    summary: '获取手机号' 
  })
  @ApiParam({ name: 'appid' })
  @ApiQuery({ name: 'code' })
  @ApiOkResponse({ type: GetPhoneNumberResponse })
  @Get('getPhoneNumber/:appid')
  getPhoneNumber(@Param('appid') appid, @Query('code') code) {
    return this.weixinMiniProgramService.getPhoneNumber(appid, code);
  }

  @ApiOperation({
    operationId: 'code2Session',
    summary: 'code2Session' 
  })
  @ApiParam({ name: 'appid' })
  @ApiQuery({ name: 'code' })
  @ApiOkResponse({ type: WeixinMiniProgramCodeToSessionResponse })
  @Get('code2Session/:appid')
  code2Session(@Param('appid') appid, @Query('code') code) {
    return this.weixinMiniProgramService.code2Session(appid, code);
  }
}
