import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';

import { BiDataStructService } from './bi-data-struct.service';
import { CreateBiDataStructDto } from './dto/create-bi-data-struct.dto';
import { UpdateBiDataStructDto } from './dto/update-bi-data-struct.dto';
import { BiDataStructGetAllResponse } from './responses/get-all.res';
import { SuccessResult } from 'src/common-model';
import { BiDataStructGetResponse } from './responses/get.res';

@ApiTags('biDataStruct')
@UseInterceptors(new TransformInterceptor())
@Controller('bi/data')
export class BiDataStructController {
  constructor(private readonly biDataStructService: BiDataStructService) {}

  @ApiOperation({
    operationId: 'getAll',
    summary: '获取所有信息' 
  })
  @ApiOkResponse({ type: BiDataStructGetAllResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('meta/:metaId/struct')
  getAll(@Param('metaId') metaId) {
    return this.biDataStructService.findAll(metaId);
  }
  
  @ApiOperation({
    operationId: 'get',
    summary: '获取指定id信息' 
  })
  @ApiOkResponse({ type: BiDataStructGetResponse })
  @ApiParam({ name: 'id' })
  @UseGuards(AuthGuard('jwt'))
  @Get('struct/:id')
  get(@Param('id') id) {
    return this.biDataStructService.findOne(id);
  }

  @ApiOperation({
    operationId: 'create',
    summary: '创建' 
  })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Post('meta/:metaId/struct')
  create(@Body() dto: CreateBiDataStructDto, @Req() req, @Param('metaId') metaId: string) {
    return this.biDataStructService.create(metaId, dto);
  }

  @ApiOperation({
    operationId: 'remove',
    summary: '删除指定id' 
  })
  @ApiOkResponse({ type: SuccessResult })
  @ApiParam({ name: 'id' })
  @UseGuards(AuthGuard('jwt'))
  @Delete('/struct/:id')
  remove(@Param('id') id) {
    return this.biDataStructService.remove(id);
  }
  
  @ApiOperation({
    operationId: 'update',
    summary: '更新指定id' 
  })
  @ApiOkResponse({ type: SuccessResult })
  @ApiParam({ name: 'id' })
  @UseGuards(AuthGuard('jwt'))
  @Put('/struct/:id')
  update(@Param('id') id, @Body() dto: UpdateBiDataStructDto) {
    return this.biDataStructService.update(id, dto);
  }
}
