import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { AddressCreateSessionDto } from './dtos/create.session.dto';
import { AddressService } from './address.service';
import { SuccessResult } from 'src/common-model';
import { AuthGuard } from '@nestjs/passport';
import { AddressGetAllSessionResponse } from './responses/get-all.session.res';
import { AddressUpdateSessionDto } from './dtos/update.session.dto';
import { AddressGetResponse } from './responses/get.session.res';

@ApiTags('address')
@UseInterceptors(new TransformInterceptor())
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @ApiOperation({
    summary: '当前登录用户添加地址',
    operationId: 'createSession'
  })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Post('create/session')
  createSession(@Body() body: AddressCreateSessionDto, @Req() req) {
    return this.addressService.create(req.user.id, body);
  }

  @ApiOperation({
    summary: '获取当前登录用户地址列表',
    operationId: 'getAllSession'
  })
  @ApiOkResponse({ type: AddressGetAllSessionResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('getAll/session')
  getAllSession(@Req() req) {
    return this.addressService.findWithUserId(req.user.id);
  }

  @ApiOperation({
    summary: '删除登录用户指定id地址',
    operationId: 'removeSession'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id/session')
  removeSession(@Req() req, @Param('id') id) {
    return this.addressService.removeWithUserId(req.user.id, id);
  }

  @ApiOperation({
    summary: '更新登录用户指定id地址',
    operationId: 'updateSession'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Put(':id/session')
  updateSession(@Req() req, @Param('id') id, @Body() dto: AddressUpdateSessionDto) {
    return this.addressService.updateWithUserId(req.user.id, id, dto);
  }

  @ApiOperation({
    summary: '获取指定id地址数据',
    operationId: 'get'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: AddressGetResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  get(@Query('id') id) {
    return this.addressService.findOne(id);
  }
}
