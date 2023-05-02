import { Body, Controller, Get, Param, ParseArrayPipe, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { SuccessResult } from 'src/common-model';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { SettingGetDto } from './dtos/get.dto';
import { SettingSetDto } from './dtos/set.dto';
import { SettingGetItemsSuccessResponse } from './responses/get.res';
import { SettingService } from './setting.service';


@ApiTags('setting')
@UseInterceptors(new TransformInterceptor())
@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @ApiOperation({
    summary: '批量获取配置key值',
    operationId: 'getItems' 
  })
  @ApiParam({
    name: 'keys',
    type: [String] 
  })
  @ApiOkResponse({ type: SettingGetItemsSuccessResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get(':keys')
  getItems(@Param('keys', ParseArrayPipe) keys: string[]) {
    return this.settingService.getItems(keys);
  }

  @ApiOperation({
    summary: '设置获取配置key值',
    operationId: 'setItems' 
  })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  setItems(@Body() setDto: SettingSetDto) {
    return this.settingService.setItems(setDto.data);
  }
}
