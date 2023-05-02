import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { MallShopService } from './mall-shop.service';
import { MallShopCreateDto } from './dtos/create.dto';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { SuccessResult } from 'src/common-model';
import { MallShopUpdateDto } from './dtos/update.dto';
import { MallShopGetResponse } from './responses/get.res';
import { MallShopGetAllResponse } from './responses/get-all.res';
import { MallShopPaginateDto } from './dtos/paginate.dto';
import { MallShopPaginateResponse } from './responses/paginate.res';

@ApiTags('mallShop')
@UseInterceptors(new TransformInterceptor())
@Controller('mall/shop')
export class MallShopController {
  constructor(private readonly mallShopService: MallShopService) {}

  @ApiOperation({
    summary: '创建店铺',
    operationId: 'create'
  })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: MallShopCreateDto, @Req() req) {
    return this.mallShopService.create({
      creatorId: req.user.id,
      desc: dto.desc,
      headimg: dto.headimg,
      name: dto.name
    });
  }

  @ApiOperation({
    summary: '删除店铺',
    operationId: 'remove'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id) {
    return this.mallShopService.remove(id);
  }

  @ApiOperation({
    summary: '更新店铺',
    operationId: 'update'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Body() dto: MallShopUpdateDto, @Param('id') id) {
    return this.mallShopService.update(id, {
      desc: dto.desc,
      headimg: dto.headimg,
      name: dto.name
    });
  }

  @ApiOperation({
    summary: '获取分页数据',
    operationId: 'paginate'
  })
  @ApiOkResponse({ type: MallShopPaginateResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('paginate')
  paginate(@Query() dto: MallShopPaginateDto) {
    return this.mallShopService.paginate({
      pageNo: dto.pageNo,
      pageSize: dto.pageSize
    }, { name: dto.name });
  }

  @ApiOperation({
    summary: '获取单个店铺',
    operationId: 'get'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: MallShopGetResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  get(@Param('id') id) {
    return this.mallShopService.findOne(id);
  }

  @ApiOperation({
    summary: '获取所有店铺',
    operationId: 'getAll'
  })
  @ApiOkResponse({ type: MallShopGetAllResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll() {
    return this.mallShopService.findAll();
  }
}
