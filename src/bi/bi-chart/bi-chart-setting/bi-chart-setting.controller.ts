import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { SuccessResult } from 'src/common-model';
import { BiChartSettingService } from './bi-chart-setting.service';
import { CreateBiChartSettingDto } from './dto/create-bi-chart-setting.dto';
import { UpdateBiChartSettingDto } from './dto/update-bi-chart-setting.dto';
import { BiChartSettingGetResponse } from './responses/get.res';

@ApiTags('biChartSetting')
@UseInterceptors(new TransformInterceptor())
@Controller('bi/chart')
export class BiChartSettingController {
  constructor(private readonly biChartSettingService: BiChartSettingService) {}

  @ApiOperation({
    operationId: 'get',
    summary: '获取指定id信息' 
  })
  @ApiOkResponse({ type: BiChartSettingGetResponse })
  @ApiParam({ name: 'metaId' })
  @UseGuards(AuthGuard('jwt'))
  @Get('meta/:metaId/setting')
  get(@Param('metaId') metaId) {
    return this.biChartSettingService.findOne(metaId);
  }
    
  @ApiOperation({
    operationId: 'create',
    summary: '创建' 
  })
  @ApiOkResponse({ type: SuccessResult })
  @ApiParam({ name: 'metaId' })
  @UseGuards(AuthGuard('jwt'))
  @Post('meta/:metaId/setting')
  create(@Param('metaId') metaId, @Body() dto: CreateBiChartSettingDto) {
    return this.biChartSettingService.create(metaId, { ...dto });
  }
    
  @ApiOperation({
    operationId: 'update',
    summary: '更新指定id' 
  })
  @ApiOkResponse({ type: SuccessResult })
  @ApiParam({ name: 'id' })
  @UseGuards(AuthGuard('jwt'))
  @Put('setting/:id')
  update(@Param('id') id, @Body() dto: UpdateBiChartSettingDto) {
    return this.biChartSettingService.update(id, dto);
  }
}
