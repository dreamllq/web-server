import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { SuccessResult } from 'src/common-model';
import { AuthGuard } from '@nestjs/passport';
import { MallGoodTagService } from './mall-good-tag.service';
import { MallGoodTagCreateDto } from './dtos/create.dto';
import { MallGoodTagUpdateDto } from './dtos/update.dto';
import { MallGoodTagPaginateDto } from './dtos/paginate.dto';
import { MallGoodTagPaginateResponse } from './responses/paginate.res';
import { MallGoodTagGetResponse } from './responses/get.res';
import { MallGoodTabGetAllResponse } from './responses/get-all.res';

@ApiTags('mallGoodTag')
@UseInterceptors(new TransformInterceptor())
@Controller('mall/good-tag')
export class MallGoodTagController {
  constructor(private readonly mallGoodTagService: MallGoodTagService) {} 

  @ApiOperation({
    summary: '创建标签',
    operationId: 'create'
  })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: MallGoodTagCreateDto) {
    return this.mallGoodTagService.create({
      desc: dto.desc,
      name: dto.name
    });
  }

  @ApiOperation({
    summary: '删除标签',
    operationId: 'remove'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id) {
    return this.mallGoodTagService.remove(id);
  }

  @ApiOperation({
    summary: '更新标签',
    operationId: 'remove'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id, @Body() dto: MallGoodTagUpdateDto) {
    return this.mallGoodTagService.update(id, { desc: dto.desc });
  }

  @ApiOperation({
    summary: '标签分页',
    operationId: 'paginate'
  })
  @ApiOkResponse({ type: MallGoodTagPaginateResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('page')
  paginate(@Query() dto:MallGoodTagPaginateDto) {
    return this.mallGoodTagService.paginate({
      pageNo: dto.pageNo,
      pageSize: dto.pageSize 
    });
  }

  @ApiOperation({
    summary: '获取标签',
    operationId: 'get'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: MallGoodTagGetResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  get(@Param('id') id) {
    return this.mallGoodTagService.findOne(id);
  }

  @ApiOperation({
    summary: '获取所有标签',
    operationId: 'getAll'
  })
  @ApiOkResponse({ type: MallGoodTabGetAllResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll() {
    return this.mallGoodTagService.findAll();
  }
}
