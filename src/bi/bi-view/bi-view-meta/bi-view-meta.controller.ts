import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';

import { BiViewMetaService } from './bi-view-meta.service';
import { CreateBiViewMetaDto } from './dto/create-bi-view-meta.dto';
import { UpdateBiViewMetaDto } from './dto/update-bi-view-meta.dto';
import { BiViewMetaGetAllResponse } from './responses/get-all.res';
import { BiViewMetaGetResponse } from './responses/get.res';
import { SuccessResult } from 'src/common-model';
import { BiViewMetaPaginateResponse } from './responses/paginate.res';
import { PaginateBiDataMetaDto } from './dto/paginate.dto';

@ApiTags('biViewMeta')
@UseInterceptors(new TransformInterceptor())
@Controller('bi/view/meta')
export class BiViewMetaController {
  constructor(private readonly biViewMetaService: BiViewMetaService) {}

  @ApiOperation({
    operationId: 'getAll',
    summary: '获取所有信息' 
  })
  @ApiOkResponse({ type: BiViewMetaGetAllResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll() {
    return this.biViewMetaService.findAll();
  }

  @ApiOperation({
    operationId: 'get',
    summary: '获取指定id信息' 
  })
  @ApiOkResponse({ type: BiViewMetaGetResponse })
  @ApiParam({ name: 'id' })
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  get(@Param('id') id) {
    return this.biViewMetaService.findOne(id);
  }

  @ApiOperation({
    operationId: 'create',
    summary: '创建' 
  })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: CreateBiViewMetaDto, @Req() req) {
    return this.biViewMetaService.create({
      ...dto,
      creatorId: req.user.id
    });
  }

  @ApiOperation({
    operationId: 'remove',
    summary: '删除指定id' 
  })
  @ApiOkResponse({ type: SuccessResult })
  @ApiParam({ name: 'id' })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id) {
    return this.biViewMetaService.remove(id);
  }

  @ApiOperation({
    operationId: 'update',
    summary: '更新指定id' 
  })
  @ApiOkResponse({ type: SuccessResult })
  @ApiParam({ name: 'id' })
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id, @Body() dto: UpdateBiViewMetaDto) {
    return this.biViewMetaService.update(id, dto);
  }

  @ApiOperation({
    operationId: 'paginate',
    summary: '板块分页数据' 
  })
  @ApiOkResponse({ type: BiViewMetaPaginateResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('page/all')
  async paginate(@Query() dto: PaginateBiDataMetaDto) {
    return this.biViewMetaService.paginate({
      pageNo: dto.pageNo,
      pageSize: dto.pageSize
    }, { name: dto.name || '' });
  }
}
