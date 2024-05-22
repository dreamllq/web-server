import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, UseInterceptors } from '@nestjs/common';
import { AiAliyunMessageService } from './ai-aliyun-message.service';
import { CreateAiAliyunMessageDto } from './dto/create-ai-aliyun-message.dto';
import { UpdateAiAliyunMessageDto } from './dto/update-ai-aliyun-message.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InsertSuccessResult } from 'src/common-model';
import { AuthGuard } from '@nestjs/passport';
import { AiAliyunAccountGetHistoryResponse } from './responses/get-history.res';
import { GetHistoryAiAliyunMessageDto } from './dto/get-history-ai-aliyun-message.dto';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';

@ApiTags('ai-aliyun-message')
@UseInterceptors(new TransformInterceptor())
@Controller('ai/aliyun/message')
export class AiAliyunMessageController {
  constructor(private readonly aiAliyunMessageService: AiAliyunMessageService) {}

  @ApiOperation({
    summary: '新增消息',
    operationId: 'create'
  })
  @ApiOkResponse({ type: InsertSuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createAiAliyunMessageDto: CreateAiAliyunMessageDto) {
    return this.aiAliyunMessageService.create(createAiAliyunMessageDto);
  }

  @ApiOperation({
    summary: '获取历史消息',
    operationId: 'getHistory'
  })
  @ApiOkResponse({ type: AiAliyunAccountGetHistoryResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getHistory(@Query() dto: GetHistoryAiAliyunMessageDto) {
    return this.aiAliyunMessageService.getHistory(dto.sessionId);
  }
}
