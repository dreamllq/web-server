import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards } from '@nestjs/common';
import { AiBaiduMessageService } from './ai-baidu-message.service';
import { CreateAiBaiduMessageDto } from './dto/create-ai-baidu-message.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { InsertSuccessResult } from 'src/common-model';
import { AuthGuard } from '@nestjs/passport';

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
}
