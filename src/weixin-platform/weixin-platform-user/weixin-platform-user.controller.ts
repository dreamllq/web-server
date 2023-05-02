import { Controller, Get, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { WeixinPlatformUserService } from './weixin-platform-user.service';
import { WeixinPlatformUserPaginateDto } from './dtos/paginate.dto';
import { AuthGuard } from '@nestjs/passport';
import { WeixinPlatformUserPaginateResponse } from './responses/paginate.res';

@ApiTags('weixin-platform-user')
@UseInterceptors(new TransformInterceptor())
@Controller('weixin-platform-user')
export class WeixinPlatformUserController {
  constructor(
    private readonly weixinPlatformUserService: WeixinPlatformUserService
  ) {}

  @ApiOperation({ operationId: 'paginate' })
  @ApiOkResponse({ type: WeixinPlatformUserPaginateResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('paginate')
  paginate(@Query() dto: WeixinPlatformUserPaginateDto) {
    return this.weixinPlatformUserService.paginate(dto);
  }
}
