import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { SuccessResult } from 'src/common-model';
import { BiViewSettingService } from './bi-view-setting.service';
import { CreateBiViewSettingDto } from './dto/create-bi-view-setting.dto';
import { UpdateBiViewSettingDto } from './dto/update-bi-view-setting.dto';
import { BiViewSettingGetResponse } from './responses/get.res';
@ApiTags('biViewSetting')
@UseInterceptors(new TransformInterceptor())
@Controller('bi/view')
export class BiViewSettingController {
  constructor(private readonly biViewSettingService: BiViewSettingService) {}
  
    @ApiOperation({
      operationId: 'get',
      summary: '获取指定id信息' 
    })
    @ApiOkResponse({ type: BiViewSettingGetResponse })
    @ApiParam({ name: 'metaId' })
    @UseGuards(AuthGuard('jwt'))
    @Get('meta/:metaId/setting')
  get(@Param('metaId') metaId) {
    return this.biViewSettingService.findOne(metaId);
  }
      
    @ApiOperation({
      operationId: 'create',
      summary: '创建' 
    })
    @ApiOkResponse({ type: SuccessResult })
    @ApiParam({ name: 'metaId' })
    @UseGuards(AuthGuard('jwt'))
    @Post('meta/:metaId/setting')
    create(@Param('metaId') metaId, @Body() dto: CreateBiViewSettingDto) {
      return this.biViewSettingService.create(metaId, { ...dto });
    }
      
    @ApiOperation({
      operationId: 'update',
      summary: '更新指定id' 
    })
    @ApiOkResponse({ type: SuccessResult })
    @ApiParam({ name: 'id' })
    @UseGuards(AuthGuard('jwt'))
    @Put('setting/:id')
    update(@Param('id') id, @Body() dto: UpdateBiViewSettingDto) {
      return this.biViewSettingService.update(id, dto);
    }
}
