import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards } from '@nestjs/common';
import { AiServiceTypeService } from './ai-service-type.service';
import { CreateAiServiceTypeDto } from './dto/create-ai-service-type.dto';
import { UpdateAiServiceTypeDto } from './dto/update-ai-service-type.dto';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { AiServiceTypeGetAllResponse } from './responses/get-all.res';
import { AuthGuard } from '@nestjs/passport';
import { DeleteSuccessResult, InsertSuccessResult, UpdateSuccessResult } from 'src/common-model';
import { AiServiceTypeGetResponse } from './responses/get.res';

@ApiTags('ai-common-service-type')
@UseInterceptors(new TransformInterceptor())
@Controller('ai/common/service-type')
export class AiServiceTypeController {
  constructor(private readonly aiServiceTypeService: AiServiceTypeService) {}

  @ApiOperation({
    summary: '新增服务类型',
    operationId: 'create'
  })
  @ApiOkResponse({ type: InsertSuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createAiServiceTypeDto: CreateAiServiceTypeDto) {
    return this.aiServiceTypeService.create(createAiServiceTypeDto);
  }

  @ApiOperation({
    summary: '获取所有ai服务类型',
    operationId: 'getAll'
  })
  @ApiOkResponse({ type: AiServiceTypeGetAllResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.aiServiceTypeService.findAll();
  }

  @ApiOperation({
    summary: '获取指定id服务类型',
    operationId: 'get' 
  })
  @ApiOkResponse({ type: AiServiceTypeGetResponse })
  @ApiParam({ name: 'id' })
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aiServiceTypeService.findOne(id);
  }

  @ApiOperation({
    summary: '更新指定id服务类型',
    operationId: 'update'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: UpdateSuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAiServiceTypeDto: UpdateAiServiceTypeDto) {
    return this.aiServiceTypeService.update(id, updateAiServiceTypeDto);
  }

  @ApiOperation({
    summary: '删除服务类型',
    operationId: 'remove'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: DeleteSuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aiServiceTypeService.remove(id);
  }
}
