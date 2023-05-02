import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { SuccessResult } from 'src/common-model';
import { ChatMessageCreateDto } from './dtos/create.dto';
import { ChatMessageService } from './chat-message.service';
import { ChatMessageGetDto } from './dtos/get.dto';
import { ChatMessageGetResponse } from './responses/get.res';
import { ChatService } from '../chat.service';

@ApiTags('chatMessage')
@UseInterceptors(new TransformInterceptor())
@Controller('chat/message')
export class ChatMessageController {
  constructor(
    private readonly chatMessageService: ChatMessageService,
    private readonly chatService: ChatService
  ) {}

  @ApiOperation({
    summary: '发送聊天',
    operationId: 'create'
  })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: ChatMessageCreateDto) {
    return this.chatService.sendMessage({
      contactsId: dto.contactsId,
      content: dto.content,
      type: dto.type,
      id: dto.id
    });
  }

  @ApiOperation({
    summary: '游标分页',
    operationId: 'findWithCursor'
  })
  @ApiOkResponse({ type: ChatMessageGetResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('cursor')
  findWithCursor(@Query() dto: ChatMessageGetDto) {
    return this.chatMessageService.findWithCursor(dto);
  }
}
