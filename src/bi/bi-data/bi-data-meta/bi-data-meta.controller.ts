import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { BiDataMetaService } from './bi-data-meta.service';
import { CreateBiDataMetaDto } from './dto/create-bi-data-meta.dto';
import { UpdateBiDataMetaDto } from './dto/update-bi-data-meta.dto';
import { BiDataMetaGetAllResponse } from './responses/get-all.res';
import { SuccessResult } from 'src/common-model';
import { BiDataMetaGetResponse } from './responses/get.res';
import { BiDataMetaPaginateResponse } from './responses/paginate.res';
import { PaginateBiDataMetaDto } from './dto/paginate.dto';

@ApiTags('biDataMeta')
@UseInterceptors(new TransformInterceptor())
@Controller('bi/data-meta')
export class BiDataMetaController {
  constructor(private readonly biDataMetaService: BiDataMetaService) {}

  @ApiOperation({
    operationId: 'getAll',
    summary: '获取所有信息' 
  })
  @ApiOkResponse({ type: BiDataMetaGetAllResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll() {
    return this.biDataMetaService.findAll();
  }

  @ApiOperation({
    operationId: 'get',
    summary: '获取指定id信息' 
  })
  @ApiOkResponse({ type: BiDataMetaGetResponse })
  @ApiParam({ name: 'id' })
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  get(@Param('id') id) {
    return this.biDataMetaService.findOne(id);
  }

  @ApiOperation({
    operationId: 'create',
    summary: '创建' 
  })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: CreateBiDataMetaDto, @Req() req) {
    return this.biDataMetaService.create({
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
    return this.biDataMetaService.remove(id);
  }

  @ApiOperation({
    operationId: 'update',
    summary: '更新指定id' 
  })
  @ApiOkResponse({ type: SuccessResult })
  @ApiParam({ name: 'id' })
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id, @Body() dto: UpdateBiDataMetaDto) {
    return this.biDataMetaService.update(id, {
      name: dto.name,
      desc: dto.desc
    });
  }

  @ApiOperation({
    operationId: 'paginate',
    summary: '板块分页数据' 
  })
  @ApiOkResponse({ type: BiDataMetaPaginateResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('page/all')
  async paginate(@Query() dto: PaginateBiDataMetaDto) {
    return this.biDataMetaService.paginate({
      pageNo: dto.pageNo,
      pageSize: dto.pageSize
    }, { name: dto.name || '' });
  }
}
