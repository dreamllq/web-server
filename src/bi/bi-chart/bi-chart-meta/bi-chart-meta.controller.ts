import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { SuccessResult } from 'src/common-model';
import { BiChartMetaService } from './bi-chart-meta.service';
import { CreateBiChartMetaDto } from './dto/create-bi-chart-meta.dto';
import { UpdateBiChartMetaDto } from './dto/update-bi-chart-meta.dto';
import { BiChartMetaGetAllResponse } from './responses/get-all.res';
import { BiChartMetaGetResponse } from './responses/get.res';
import { BiChartMetaPaginateResponse } from './responses/paginate.res';
import { PaginateBiChartMetaDto } from './dto/paginate.dto';

@ApiTags('biChartMeta')
@UseInterceptors(new TransformInterceptor())
@Controller('bi/chart/meta')
export class BiChartMetaController {
  constructor(private readonly biChartMetaService: BiChartMetaService) {}

  @ApiOperation({
    operationId: 'getAll',
    summary: '获取所有信息' 
  })
  @ApiOkResponse({ type: BiChartMetaGetAllResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll() {
    return this.biChartMetaService.findAll();
  }

  @ApiOperation({
    operationId: 'get',
    summary: '获取指定id信息' 
  })
  @ApiOkResponse({ type: BiChartMetaGetResponse })
  @ApiParam({ name: 'id' })
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  get(@Param('id') id) {
    return this.biChartMetaService.findOne(id);
  }
  
  @ApiOperation({
    operationId: 'create',
    summary: '创建' 
  })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: CreateBiChartMetaDto, @Req() req) {
    return this.biChartMetaService.create({
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
    return this.biChartMetaService.remove(id);
  }
  
  @ApiOperation({
    operationId: 'update',
    summary: '更新指定id' 
  })
  @ApiOkResponse({ type: SuccessResult })
  @ApiParam({ name: 'id' })
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id, @Body() dto: UpdateBiChartMetaDto) {
    return this.biChartMetaService.update(id, dto);
  }
  
  @ApiOperation({
    operationId: 'paginate',
    summary: '板块分页数据' 
  })
  @ApiOkResponse({ type: BiChartMetaPaginateResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('page/all')
  async paginate(@Query() dto: PaginateBiChartMetaDto) {
    return this.biChartMetaService.paginate({
      pageNo: dto.pageNo,
      pageSize: dto.pageSize
    }, { name: dto.name || '' });
  }
}
