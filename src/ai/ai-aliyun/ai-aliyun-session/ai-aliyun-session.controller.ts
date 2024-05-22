import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards, Req, Query } from '@nestjs/common';
import { AiAliyunSessionService } from './ai-aliyun-session.service';
import { CreateAiAliyunSessionDto } from './dto/create-ai-aliyun-session.dto';
import { UpdateAiAliyunSessionDto } from './dto/update-ai-aliyun-session.dto';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { DeleteSuccessResult, InsertSuccessResult, UpdateSuccessResult } from 'src/common-model';
import { AuthGuard } from '@nestjs/passport';
import { AiAliyunSessionGetAllResponse } from './responses/get-all.res';
import { AiAliyunSessionPaginateResponse } from './responses/paginate.res';
import { AiAliyunSessionPaginateDto } from './dto/paginate.dto';
import { AiAliyunSessionGetResponse } from './responses/get.res';

@ApiTags('ai-aliyun-session')
@UseInterceptors(new TransformInterceptor())
@Controller('ai/aliyun/session')
export class AiAliyunSessionController {
  constructor(private readonly aiAliyunSessionService: AiAliyunSessionService) {}

  @ApiOperation({
    summary: '新增会话',
    operationId: 'create'
  })
  @ApiOkResponse({ type: InsertSuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createAiAliyunSessionDto: CreateAiAliyunSessionDto, @Req() req) {
    return this.aiAliyunSessionService.create(createAiAliyunSessionDto, { creator: req.user.id });
  }

  @ApiOperation({
    summary: '获取所有会话',
    operationId: 'getAll'
  })
  @ApiOkResponse({ type: AiAliyunSessionGetAllResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.aiAliyunSessionService.findAll();
  }

  @ApiOperation({
    summary: '获取分页会话',
    operationId: 'paginate'
  })
  @ApiOkResponse({ type: AiAliyunSessionPaginateResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('paginate')
  paginate(@Query() dto: AiAliyunSessionPaginateDto) {
    return this.aiAliyunSessionService.paginate({
      pageNo: dto.pageNo,
      pageSize: dto.pageSize
    });
  }

  @ApiOperation({
    summary: '获取指定id会话',
    operationId: 'get' 
  })
  @ApiOkResponse({ type: AiAliyunSessionGetResponse })
  @ApiParam({ name: 'id' })
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aiAliyunSessionService.findOne(id);
  }

  @ApiOperation({
    summary: '更新指定id会话',
    operationId: 'update'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: UpdateSuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAiAliyunSessionDto: UpdateAiAliyunSessionDto) {
    return this.aiAliyunSessionService.update(id, updateAiAliyunSessionDto);
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
    return this.aiAliyunSessionService.remove(id);
  }
}
