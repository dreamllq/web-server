import { Body, Controller, Delete, Get, Post, Query, Redirect, Req, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { AuthService } from './auth.service';
import { LoginByCodeDto } from './dtos/login-by-code.dto';
import { LoginBySmsCodeDto } from './dtos/login-by-sms-code.dto';
import { LoginByWeixinDto } from './dtos/login-by-weixin.dto';
import { LoginDto } from './dtos/login.dto';
import { AuthLoginSuccessResponse } from './responses/login.res';
import { AuthVerifyResponse } from './responses/verify.res';
import { SuccessResult } from 'src/common-model';


@ApiTags('auth')
@UseInterceptors(new TransformInterceptor())
@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '验证auth',
    operationId: 'verify' 
  })
  @ApiOkResponse({ type: AuthVerifyResponse })
  @Get('verify')
  verify(@Req() req: Request) {
    const authorization = req.headers['authorization'];
    if (!authorization) {
      return false;
    } else {
      const result = this.authService.verify(authorization.split(' ')[1]);
      const now = Math.floor(Date.now() / 1000);
      return now < result.exp;
    }
  }

  @ApiOperation({
    summary: '注销登录用户',
    operationId: 'cancellation' 
  })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Delete('cancellation')
  cancellation(@Req() req) {
    return this.authService.cancellation(req.user.id);
  }


  @ApiOperation({
    summary: '用户名密码登录',
    operationId: 'login' 
  })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ type: AuthLoginSuccessResponse })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiOperation({
    summary: '手机验证码登录',
    operationId: 'loginBySmsCode' 
  })
  @ApiOkResponse({ type: AuthLoginSuccessResponse })
  @Post('loginBySmsCode')
  async loginBySmsCode(@Body() loginDto: LoginBySmsCodeDto) {
    return this.authService.loginBySmsCode(loginDto.mobile, loginDto.code);
  }

  @ApiOperation({
    summary: '微信登录',
    operationId: 'loginByWeixin' 
  })
  @ApiOkResponse({ type: AuthLoginSuccessResponse })
  @Post('loginByWeixin')
  async loginByWeixin(@Body() loginDto: LoginByWeixinDto) {
    return this.authService.loginByWeixin(loginDto);
  }

  @ApiOperation({
    summary: '微信小程序手机号登录',
    operationId: 'loginByWeixinMobile' 
  })
  @ApiOkResponse({ type: AuthLoginSuccessResponse })
  @Post('loginByWeixinMobile')
  async loginByWeixinMobile(@Body() loginDto: LoginByWeixinDto) {
    return this.authService.loginByWeixinMobile(loginDto);
  }

  @ApiOperation({
    summary: '类似oauth2的code登录',
    operationId: 'loginByCode' 
  })
  @Post('loginByCode')
  loginByCode(@Body() loginDto: LoginByCodeDto) {
    return this.authService.loginByCode(loginDto.code);
  }

  @ApiOperation({
    summary: '生成登录code',
    operationId: 'generateLoginCode' 
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('authenticate')
  generateLoginCode(@Request() req) {
    return this.authService.generateAuthCode(req.user.id);
  }
}
