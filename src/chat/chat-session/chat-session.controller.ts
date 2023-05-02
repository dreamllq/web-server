import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { SuccessResult } from 'src/common-model';
import { ChatSessionService } from './chat-session.service';
import { ChatSessionCreateDto } from './dtos/create.dto';
import { ChatSessionGetResponse } from './responses/get.res';
import { ChatSessionCreateResponse } from './responses/create.res';

@ApiTags('chatSession')
@UseInterceptors(new TransformInterceptor())
@Controller('chat/session')
export class ChatSessionController {
  constructor(private readonly chatSessionService: ChatSessionService) {}

  @ApiOperation({
    summary: '添加聊天会话',
    operationId: 'create'
  })
  @ApiOkResponse({ type: ChatSessionCreateResponse })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: ChatSessionCreateDto, @Req() req) {
    return this.chatSessionService.create({
      creatorId: req.user.id,
      ...dto
    });
  }

  @ApiOperation({
    summary: '删除聊天会话',
    operationId: 'remove'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id, @Req() req) {
    return this.chatSessionService.remove(id, req.user.id);
  }

  @ApiOperation({
    summary: '获取所有联系人',
    operationId: 'get'
  })
  @ApiOkResponse({ type: ChatSessionGetResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  get(@Req() req) {
    return this.chatSessionService.findAll({ creatorId: req.user.id });
  }
}
