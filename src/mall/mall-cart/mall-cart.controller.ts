import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { SuccessResult } from 'src/common-model';
import { MallCartService } from './mall-cart.service';
import { MallCartCreateDto } from './dtos/create.dto';
import { MallCartUpdateDto } from './dtos/update.dto';
import { MallCartGetAllResponse } from './responses/get-all.res';
import { MallCartBatchUpdateDto } from './dtos/batch-update.dto';

@ApiTags('mallCart')
@UseInterceptors(new TransformInterceptor())
@Controller('mall/cart')
export class MallCartController {
  constructor(private readonly mallCartService: MallCartService) {}

  @ApiOperation({
    summary: '添加购物车',
    operationId: 'add'
  })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  add(@Body() dto: MallCartCreateDto, @Req() req) {
    return this.mallCartService.add({
      count: dto.count,
      goodId: dto.goodId,
      userId: req.user.id
    });
  }

  @ApiOperation({
    summary: '删除购物车',
    operationId: 'remove'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id) {
    return this.mallCartService.remove(id);
  }

  @ApiOperation({
    summary: '批量更新购物车',
    operationId: 'batchUpdate'
  })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Put('batch')
  batchUpdate(@Body() dto: MallCartBatchUpdateDto) {
    return this.mallCartService.batchUpdate(dto.ids, { checked: dto.checked });
  }

  @ApiOperation({
    summary: '更新购物车',
    operationId: 'update'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Body() dto: MallCartUpdateDto, @Param('id') id) {
    return this.mallCartService.update(id, {
      count: dto.count,
      checked: dto.checked 
    });
  }

  @ApiOperation({
    summary: '获取用户购物车',
    operationId: 'getAll'
  })
  @ApiOkResponse({ type: MallCartGetAllResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll(@Req() req) {
    return this.mallCartService.findAll({ userId: req.user.id });
  }
}
