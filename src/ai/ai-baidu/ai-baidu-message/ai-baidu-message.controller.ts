import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards, Query } from '@nestjs/common';
import { AiBaiduMessageService } from './ai-baidu-message.service';
import { CreateAiBaiduMessageDto } from './dto/create-ai-baidu-message.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { InsertSuccessResult } from 'src/common-model';
import { AuthGuard } from '@nestjs/passport';
import { GetHistoryAiBaiduMessageDto } from './dto/get-history-ai-baidu-message.dto';
import { AiBaiduAccountGetHistoryResponse } from './responses/get-history.res';

@ApiTags('ai-baidu-message')
@UseInterceptors(new TransformInterceptor())
@Controller('ai/baidu/message')
export class AiBaiduMessageController {
  constructor(private readonly aiBaiduMessageService: AiBaiduMessageService) {}

  @ApiOperation({
    summary: '新增百度消息',
    operationId: 'create'
  })
  @ApiOkResponse({ type: InsertSuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createAiBaiduMessageDto: CreateAiBaiduMessageDto) {
    return this.aiBaiduMessageService.create(createAiBaiduMessageDto);
  }

  @ApiOperation({
    summary: '获取历史消息',
    operationId: 'getHistory'
  })
  @ApiOkResponse({ type: AiBaiduAccountGetHistoryResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getHistory(@Query() dto: GetHistoryAiBaiduMessageDto) {
    return this.aiBaiduMessageService.getHistory(dto.sessionId);
  }
}
