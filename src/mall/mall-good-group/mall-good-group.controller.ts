import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { MallGoodGroupService } from './mall-good-group.service';
import { MallGoodGroupCreateDto } from './dtos/create.dto';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { MallGoodGroupUpdateDto } from './dtos/update.dto';
import { SuccessResult } from 'src/common-model';
import { MallGoodGroupGetTreeResponse } from './responses/get-tree.res';
import { MallGoodGroupGetAllResponse } from './responses/get-all.res';
import { MallGoodGroupGetResponse } from './responses/get.res';

@ApiTags('mallGoodGroup')
@UseInterceptors(new TransformInterceptor())
@Controller('mall/good-group')
export class MallGoodGroupController {
  constructor(private readonly mallGoodGroupService: MallGoodGroupService) {}

  @ApiOperation({
    summary: '创建商品分组',
    operationId: 'create'
  })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: MallGoodGroupCreateDto, @Req() req) {
    return this.mallGoodGroupService.create({
      creatorId: req.user.id,
      name: dto.name,
      headimg: dto.headimg,
      parentId: dto.parentId
    });
  }

  @ApiOperation({
    summary: '删除商品分组',
    operationId: 'remove'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id) {
    return this.mallGoodGroupService.remove(id);
  }

  @ApiOperation({
    summary: '更新商品分组',
    operationId: 'update'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id, @Body() dto: MallGoodGroupUpdateDto) {
    return this.mallGoodGroupService.update(id, {
      headimg: dto.headimg,
      name: dto.name
    });
  }

  @ApiOperation({
    summary: '获取商品分组树',
    operationId: 'getTree'
  })
  @ApiOkResponse({ type: MallGoodGroupGetTreeResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('tree')
  getTree() {
    return this.mallGoodGroupService.findTrees();
  }

  @ApiOperation({
    summary: '获取商品分组',
    operationId: 'get'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: MallGoodGroupGetResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  get(@Param('id') id) {
    return this.mallGoodGroupService.findOne(id);
  }

  @ApiOperation({
    summary: '获取平铺商品分组数据',
    operationId: 'getAll'
  })
  @ApiOkResponse({ type: MallGoodGroupGetAllResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll() {
    return this.mallGoodGroupService.findAll();
  }
}
