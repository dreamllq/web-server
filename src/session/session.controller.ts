import { Controller, Get, UseGuards, Request, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { SessionService } from './session.service';
import { SessionGetUserResponse } from './responses/get-user.res';

@ApiTags('session')
@UseInterceptors(new TransformInterceptor())
@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @ApiOperation({
    summary: '获取当前登录人用户信息',
    operationId: 'getUser'
  })
  @ApiOkResponse({ type: SessionGetUserResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  user(@Request() req) {
    return this.sessionService.getLoginUser(req.user.id);
  }

  @ApiOperation({
    summary: '获取当前登录人有权限的资源',
    operationId: 'getResources'
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('resources')
  resources(@Request() req) {
    return this.sessionService.getResources(req.user.id);
  }
}
