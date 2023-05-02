import { Body, Controller, Get, Param, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { SuccessResult } from 'src/common-model';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { WeixinOfficialAccountConfigUpdateDto } from './dtos/update.dto';
import { WeixinOfficialAccountConfigGetByWeixinSuccessResponse } from './responses/get-by-weixin.res';
import { WeixinOfficialAccountConfigService } from './weixin-official-account-config.service';

@ApiTags('weixinOfficialAccountConfig')
@UseInterceptors(new TransformInterceptor())
@Controller('weixin/official-account-config')
export class WeixinOfficialAccountConfigController {
  constructor(private readonly weixinOfficialAccountConfigService: WeixinOfficialAccountConfigService) {}

  @ApiOperation({
    summary: '通过weixinId获取公众号配置',
    operationId: 'getAndCreateByWeixin' 
  })
  @ApiParam({
    name: 'weixinId',
    type: String 
  })
  @ApiOkResponse({ type: WeixinOfficialAccountConfigGetByWeixinSuccessResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('/weixin/:weixinId')
  getAndCreateByWeixin(@Param('weixinId') weixinId) {
    return this.weixinOfficialAccountConfigService.getAndCreateByWeixin(weixinId);
  }

  @ApiOperation({
    summary: '更新指定id的公众号配置',
    operationId: 'update' 
  })
  @ApiParam({
    name: 'id',
    type: String 
  })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id, @Body() dto: WeixinOfficialAccountConfigUpdateDto) {
    return this.weixinOfficialAccountConfigService.update(id, dto);
  }
}
