import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards, Req, Query } from '@nestjs/common';
import { AiAliyunServiceService } from './ai-aliyun-service.service';
import { CreateAiAliyunServiceDto } from './dto/create-ai-aliyun-service.dto';
import { UpdateAiAliyunServiceDto } from './dto/update-ai-aliyun-service.dto';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { DeleteSuccessResult, InsertSuccessResult, UpdateSuccessResult } from 'src/common-model';
import { AuthGuard } from '@nestjs/passport';
import { AiAliyunServiceGetAllResponse } from './responses/get-all.res';
import { AiAliyunServicePaginateDto } from './dto/paginate.dto';
import { AiAliyunServicePaginateResponse } from './responses/paginate.res';
import { AiAliyunServiceGetResponse } from './responses/get.res';

@ApiTags('ai-aliyun-service')
@UseInterceptors(new TransformInterceptor())
@Controller('ai/aliyun/service')
export class AiAliyunServiceController {
  constructor(private readonly aiAliyunServiceService: AiAliyunServiceService) {}

  @ApiOperation({
    summary: '新增服务',
    operationId: 'create'
  })
  @ApiOkResponse({ type: InsertSuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createAiAliyunServiceDto: CreateAiAliyunServiceDto, @Req() req) {
    return this.aiAliyunServiceService.create(createAiAliyunServiceDto, { creator: req.user.id });
  }

  @ApiOperation({
    summary: '获取所有服务',
    operationId: 'getAll'
  })
  @ApiOkResponse({ type: AiAliyunServiceGetAllResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.aiAliyunServiceService.findAll();
  }

  @ApiOperation({
    summary: '获取分页服务',
    operationId: 'paginate'
  })
  @ApiOkResponse({ type: AiAliyunServicePaginateResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('paginate')
  paginate(@Query() dto: AiAliyunServicePaginateDto) {
    return this.aiAliyunServiceService.paginate({
      pageNo: dto.pageNo,
      pageSize: dto.pageSize
    });
  }

  @ApiOperation({
    summary: '获取指定id服务',
    operationId: 'get' 
  })
  @ApiOkResponse({ type: AiAliyunServiceGetResponse })
  @ApiParam({ name: 'id' })
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aiAliyunServiceService.findOne(id);
  }

  @ApiOperation({
    summary: '更新指定id服务',
    operationId: 'update'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: UpdateSuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAiAliyunServiceDto: UpdateAiAliyunServiceDto) {
    return this.aiAliyunServiceService.update(id, updateAiAliyunServiceDto);
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
    return this.aiAliyunServiceService.remove(id);
  }
}
