import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { SuccessResult } from 'src/common-model';
import { ChatContactsService } from './chat-contacts.service';
import { ChatContactsCreateDto } from './dtos/create.dto';
import { ChatContactsGetResponse } from './responses/get.res';
import { ChatContactsUpdateDto } from './dtos/update.dto';
import { ChatService } from '../chat.service';

@ApiTags('chatContacts')
@UseInterceptors(new TransformInterceptor())
@Controller('chat/contacts')
export class ChatContactsController {
  constructor(
    private readonly chatContactsService: ChatContactsService,
    private readonly chatService: ChatService
  ) {}

  @ApiOperation({
    summary: '添加联系人',
    operationId: 'create'
  })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: ChatContactsCreateDto, @Req() req) {
    return this.chatContactsService.create({
      creatorId: req.user.id,
      ...dto
    });
  }

  @ApiOperation({
    summary: '删除联系人',
    operationId: 'remove'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id, @Req() req) {
    // return this.chatContactsService.remove(id, req.user.id);
    return this.chatService.removeContacts(id, req.user.id);
  }

  @ApiOperation({
    summary: '更新联系人',
    operationId: 'updateStatus'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  updateStatus(@Param('id') id, @Body() dto: ChatContactsUpdateDto) {
    return this.chatContactsService.updateStatus(id, dto.status);
  }

  @ApiOperation({
    summary: '获取所有联系人',
    operationId: 'get'
  })
  @ApiOkResponse({ type: ChatContactsGetResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  get(@Req() req) {
    return this.chatContactsService.findAll({ creatorId: req.user.id });
  }
}
