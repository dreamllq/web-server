import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { SuccessResult } from 'src/common-model';
import { WeixinPayService } from './weixin-pay.service';
import { WeixinPayCreateDto } from './dtos/create.dto';
import { WeixinPayUpdateDto } from './dtos/update.dto';
import { WeixinPayPaginateResponse } from './responses/paginate.res';
import { WeixinPayPaginateDto } from './dtos/paginate.dto';
import { WeixinPayGetResponse } from './responses/get.res';

@ApiTags('weixinPay')
@UseInterceptors(new TransformInterceptor())
@Controller('weixin/pay')
export class WeixinPayController {
  constructor(private readonly weixinPayService: WeixinPayService) {}

  @ApiOperation({
    summary: '创建支付配置',
    operationId: 'create'
  })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: WeixinPayCreateDto) {
    return this.weixinPayService.create(dto);
  }

  @ApiOperation({
    summary: '删除支付配置',
    operationId: 'remove'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id) {
    return this.weixinPayService.remove(id);
  }

  @ApiOperation({
    summary: '更新支付配置',
    operationId: 'update'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id, @Body() dto: WeixinPayUpdateDto) {
    return this.weixinPayService.update(id, dto);
  }

  @ApiOperation({
    summary: '分页',
    operationId: 'paginate'
  })
  @ApiOkResponse({ type: WeixinPayPaginateResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('page')
  paginate(@Query() dto: WeixinPayPaginateDto) {
    return this.weixinPayService.paginate({
      pageNo: dto.pageNo,
      pageSize: dto.pageSize
    });
  }

  @ApiOperation({
    summary: 'id数据',
    operationId: 'get'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: WeixinPayGetResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  get(@Param('id') id) {
    return this.weixinPayService.findOne(id);
  }

  @ApiOperation({
    summary: '获取所有数据',
    operationId: 'getAll'
  })
  @ApiOkResponse({ type: WeixinPayGetResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll() {
    return this.weixinPayService.findAll();
  }
}
