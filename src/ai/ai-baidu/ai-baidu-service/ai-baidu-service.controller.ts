import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards, Req, Query } from '@nestjs/common';
import { AiBaiduServiceService } from './ai-baidu-service.service';
import { CreateAiBaiduServiceDto } from './dto/create-ai-baidu-service.dto';
import { UpdateAiBaiduServiceDto } from './dto/update-ai-baidu-service.dto';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { DeleteSuccessResult, InsertSuccessResult, UpdateSuccessResult } from 'src/common-model';
import { AuthGuard } from '@nestjs/passport';
import { AiBaiduServiceGetAllResponse } from './responses/get-all.res';
import { AiBaiduServicePaginateResponse } from './responses/paginate.res';
import { AiBaiduServicePaginateDto } from './dto/paginate.dto';
import { AiBaiduServiceGetResponse } from './responses/get.res';

@ApiTags('ai-baidu-service')
@UseInterceptors(new TransformInterceptor())
@Controller('ai/baidu/service')
export class AiBaiduServiceController {
  constructor(private readonly aiBaiduServiceService: AiBaiduServiceService) {}

  @ApiOperation({
    summary: '新增服务',
    operationId: 'create'
  })
  @ApiOkResponse({ type: InsertSuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createAiBaiduServiceDto: CreateAiBaiduServiceDto, @Req() req) {
    return this.aiBaiduServiceService.create(createAiBaiduServiceDto, { creator: req.user.id });
  }

  @ApiOperation({
    summary: '获取所有服务',
    operationId: 'getAll'
  })
  @ApiOkResponse({ type: AiBaiduServiceGetAllResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.aiBaiduServiceService.findAll();
  }

  @ApiOperation({
    summary: '获取分页服务',
    operationId: 'paginate'
  })
  @ApiOkResponse({ type: AiBaiduServicePaginateResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('paginate')
  paginate(@Query() dto: AiBaiduServicePaginateDto) {
    return this.aiBaiduServiceService.paginate({
      pageNo: dto.pageNo,
      pageSize: dto.pageSize
    });
  }

  @ApiOperation({
    summary: '获取指定id服务',
    operationId: 'get' 
  })
  @ApiOkResponse({ type: AiBaiduServiceGetResponse })
  @ApiParam({ name: 'id' })
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aiBaiduServiceService.findOne(id);
  }

  @ApiOperation({
    summary: '更新指定id服务',
    operationId: 'update'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: UpdateSuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAiBaiduServiceDto: UpdateAiBaiduServiceDto) {
    return this.aiBaiduServiceService.update(id, updateAiBaiduServiceDto);
  }

  @ApiOperation({
    summary: '删除服务',
    operationId: 'remove'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: DeleteSuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aiBaiduServiceService.remove(id);
  }
}
