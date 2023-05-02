import { Body, Controller, Post, Session, UseInterceptors } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { SmsTestDto } from './dtos/test.dto';
import { SmsService } from './sms.service';
import { SmsTypeEnum } from './types';

@ApiTags('sms')
@UseInterceptors(new TransformInterceptor())
@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}
  
  @ApiOperation({
    summary: 'sms测试',
    operationId: 'test' 
  })
  @Post('test')
  test(@Body() testDto: SmsTestDto, @Session() session) {
    session.smsCode = testDto.code;
    return this.smsService.sendCode(testDto.phone, testDto.code);
  }

  @ApiOperation({
    summary: '发送验证码',
    operationId: 'sendCode' 
  })
  @ApiParam({ name: 'phone' })
  @ApiParam({
    name: 'type',
    enum: SmsTypeEnum
  })
  @Post(':type/:phone')
  async sendCode(@Param('phone') phone, @Param('type') type) {
    await this.smsService.sendValidCode(phone, type);
  }
}
