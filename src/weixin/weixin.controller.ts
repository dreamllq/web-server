import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SuccessResult } from 'src/common-model';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { WeixinCreateDto } from './dtos/create.dto';
import { WeixinPaginateDto } from './dtos/paginate.dto';
import { WeixinUpdateDto } from './dtos/update.dto';
import { WeixinGetSuccessResponse } from './responses/get.res';
import { WeixinPaginateSuccessResponse } from './responses/paginate.res';
import { WeixinService } from './weixin.service';
import { WeixinGetAllResponse } from './responses/get-all.res';
import { WeixinAppTypeEnum } from './weixin.type';

@ApiTags('weixin')
@UseInterceptors(new TransformInterceptor())
@Controller('weixin')
export class WeixinController {
  constructor(
    private readonly weixinService: WeixinService
  ) {}

  @ApiOperation({
    summary: '获取所有微信应用数据',
    operationId: 'getAll' 
  })
  @ApiQuery({
    name: 'type',
    enum: WeixinAppTypeEnum
  })
  @ApiOkResponse({ type: WeixinGetAllResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll(@Query('type') type: WeixinAppTypeEnum) {
    return this.weixinService.find(type);
  }

  @ApiOperation({
    summary: '获取分页微信应用数据',
    operationId: 'paginate' 
  })
  @ApiOkResponse({ type: WeixinPaginateSuccessResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('page')
  paginate(@Query() paginateDto: WeixinPaginateDto) {
    return this.weixinService.paginate({
      pageNo: paginateDto.pageNo,
      pageSize: paginateDto.pageSize
    }, { name: paginateDto.name });
  }

  @ApiOperation({
    summary: '创建微信应用',
    operationId: 'create' 
  })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createDto: WeixinCreateDto) {
    return this.weixinService.create(createDto);
  }

  @ApiOperation({
    summary: '删除微信应用',
    operationId: 'remove' 
  })
  @ApiParam({
    name: 'id',
    type: String 
  })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id) {
    return this.weixinService.remove(id);
  }

  @ApiOperation({
    summary: '获取指定id微信应用数据',
    operationId: 'get' 
  })
  @ApiParam({
    name: 'id',
    type: String 
  })
  @ApiOkResponse({ type: WeixinGetSuccessResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  get(@Param('id') id) {
    return this.weixinService.findOne(id);
  }

  @ApiOperation({
    summary: '更新指定id微信应用数据',
    operationId: 'update'
  })
  @ApiParam({
    name: 'id',
    type: String 
  })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id, @Body() updateDto: WeixinUpdateDto) {
    return this.weixinService.update(id, updateDto);
  }
}
