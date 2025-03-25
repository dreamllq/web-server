import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, Res, StreamableFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { DeleteSuccessResult, InsertSuccessResult, SuccessResult, UpdateSuccessResult } from 'src/common-model';
import { FsService } from './fs.service';
import { CreateFDto } from './dto/create-f.dto';
import { UpdateFDto } from './dto/update-f.dto';
import { FGetAllResponse } from './responses/get-all.res';
import { FGetResponse } from './responses/get.res';
import { GetAllFDto } from './dto/get-all-f.dto';
const mime = require('mime');

@ApiTags('fs')
@UseInterceptors(new TransformInterceptor())
@Controller('fs')
export class FsController {
  constructor(private readonly fsService: FsService) {}

  @ApiOperation({
    summary: '新增服务',
    operationId: 'create'
  })
  @ApiOkResponse({ type: InsertSuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createFDto: CreateFDto, @Req() req) {
    return this.fsService.create(createFDto, { creator: req.user.id });
  }

  @ApiOperation({
    summary: '获取所有服务',
    operationId: 'getAll'
  })
  @ApiOkResponse({ type: FGetAllResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Query() query: GetAllFDto) {
    return this.fsService.findAll(query);
  }

  @ApiOperation({
    summary: '获取子节点',
    operationId: 'getChildren'
  })
  @ApiOkResponse({ type: FGetAllResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('children/:id')
  findChildren(@Param('id') id: string) {
    return this.fsService.findChildren(id);
  }

  @ApiOperation({
    summary: '获取指定id服务',
    operationId: 'get' 
  })
  @ApiOkResponse({ type: FGetResponse })
  @ApiParam({ name: 'id' })
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fsService.findOne(id);
  }

  @ApiOperation({
    summary: '更新指定id服务',
    operationId: 'update'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: UpdateSuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFDto: UpdateFDto) {
    return this.fsService.update(id, updateFDto);
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
    return this.fsService.remove(id);
  }
}
