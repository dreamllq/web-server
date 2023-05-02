import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { SuccessResult } from 'src/common-model';
import { MallGoodService } from './mall-good.service';
import { MallGoodCreateDto } from './dtos/create.dto';
import { MallGoodUpdateDto } from './dtos/update.dto';
import { MallGoodPaginateDto } from './dtos/paginate.dto';
import { MallGoodPaginateResponse } from './responses/paginate.res';
import { MallGoodGetResponse } from './responses/get.res';
import { MallGoodGetAllDto } from './dtos/get-all.dto';
import { MallGoodGetAllResponse } from './responses/get-all.res';

@ApiTags('mallGood')
@UseInterceptors(new TransformInterceptor())
@Controller('mall/good')
export class MallGoodController {
  constructor(private readonly mallGoodService: MallGoodService) {}

  @ApiOperation({
    summary: '创建商品',
    operationId: 'create'
  })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: MallGoodCreateDto, @Req() req) {
    return this.mallGoodService.create({
      creatorId: req.user.id,
      ...dto
    });
  }

  @ApiOperation({
    summary: '删除商品',
    operationId: 'remove'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id) {
    return this.mallGoodService.remove(id);
  }

  @ApiOperation({
    summary: '更新商品',
    operationId: 'update'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Body() dto: MallGoodUpdateDto, @Param('id') id) {
    return this.mallGoodService.update(id, dto);
  }

  @ApiOperation({
    summary: '获取分页商品数据',
    operationId: 'paginate'
  })
  @ApiOkResponse({ type: MallGoodPaginateResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('paginate')
  paginate(@Query() dto: MallGoodPaginateDto) {
    return this.mallGoodService.paginate({
      pageNo: dto.pageNo,
      pageSize: dto.pageSize
    }, {
      shopId: dto.shopId,
      title: dto.title || ''
    });
  }

  @ApiOperation({
    summary: '获取id商品数据',
    operationId: 'get'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: MallGoodGetResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  get(@Param('id') id) {
    return this.mallGoodService.findOne(id);
  }

  @ApiOperation({
    summary: '获取所有商品数据',
    operationId: 'getAll'
  })
  @ApiOkResponse({ type: MallGoodGetAllResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll(@Query() dto: MallGoodGetAllDto) {
    return this.mallGoodService.findAll({ shopId: dto.shopId });
  }
}
