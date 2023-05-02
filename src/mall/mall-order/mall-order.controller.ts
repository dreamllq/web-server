import { Body, Controller, Get, Param, Post, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { SuccessResult } from 'src/common-model';
import { AuthGuard } from '@nestjs/passport';
import { MallOrderService } from './mall-order.service';
import { MallOrderCreateDto } from './dtos/create.dto';
import { MallOrderGetResponse } from './responses/get.res';
import { MallOrderPageWidthCursorDto } from './dtos/page-width-cursor.dto';
import { MallOrderPageWidthCursorResponse } from './responses/page-width-cursor.res';
import { MallOrderPaginateDto } from './dtos/paginate.dto';
import { MallOrderPaginateResponse } from './responses/paginate.res';

@ApiTags('mallOrder')
@UseInterceptors(new TransformInterceptor())
@Controller('mall/order')
export class MallOrderController {
  constructor(private readonly mallOrderService: MallOrderService) {}

  @ApiOperation({
    summary: '创建订单',
    operationId: 'create'
  })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: MallOrderCreateDto, @Req() req) {
    return this.mallOrderService.create({
      addressId: dto.addressId,
      creatorId: req.user.id,
      goods: dto.goods
    });
  }

  @ApiOperation({
    summary: '订单登录用户游标分页',
    operationId: 'paginateWidthCursorSession'
  })
  @ApiOkResponse({ type: MallOrderPageWidthCursorResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('pageByCursor/session')
  paginateWidthCursorSession(@Query() dto: MallOrderPageWidthCursorDto, @Req() req) {
    return this.mallOrderService.paginateWidthCursor({
      count: dto.count,
      afterId: dto.afterId
    }, { creatorId: req.user.id });
  }

  @ApiOperation({
    summary: '订单分页',
    operationId: 'paginate'
  })
  @ApiOkResponse({ type: MallOrderPaginateResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('page')
  paginate(@Query() dto: MallOrderPaginateDto) {
    return this.mallOrderService.paginate({
      pageNo: dto.pageNo,
      pageSize: dto.pageSize 
    });
  }

  @ApiOperation({
    summary: '获取订单',
    operationId: 'get'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: MallOrderGetResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  get(@Param('id') id) {
    return this.mallOrderService.findOne(id);
  }
}
