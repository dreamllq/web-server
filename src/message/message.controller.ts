import { Body, Controller, Get, Param, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageSendDto } from './dtos/send.dto';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SuccessResult } from 'src/common-model';

@ApiTags('message')
@UseInterceptors(new TransformInterceptor())
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @ApiOperation({
    operationId: 'send',
    summary: '发送消息' 
  })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Post('send')
  send(@Body() dto: MessageSendDto) {
    return this.messageService.send(dto);
  }

}
