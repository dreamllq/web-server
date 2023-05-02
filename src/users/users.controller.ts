import { Body, Controller, Delete, Get, Param, Post, Put, Query, Session, UseGuards, UseInterceptors, Request, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DeleteSuccessResult, InsertSuccessResult, SuccessResult, UpdateSuccessResult } from 'src/common-model';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { IPaginationResult } from 'src/types';
import { CreateUsersDto } from './dtos/create-users.dto';
import { UsersPaginateDto } from './dtos/paginate.dto';
import { UserUpdateDto } from './dtos/update.dto';
import { UserGetAllSuccessResponse } from './responses/get-all.res';
import { UserGetSuccessResponse } from './responses/get.res';
import { UsersPaginateSuccessResponse } from './responses/paginate.res';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersBindWeixinDto } from './dtos/bind-weixin.dto';
import { UsersBindMobileDto } from './dtos/bind-mobile.dto';
import { UsersBindUsernameDto } from './dtos/bind-username.dto';

@ApiTags('users')
@UseInterceptors(new TransformInterceptor())
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({
    summary: '获取所有用户数据',
    operationId: 'getAll' 
  })
  @ApiOkResponse({ type: UserGetAllSuccessResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    return await this.userService.findAll(); 
  }

  @ApiOperation({
    summary: '获取分页用户数据',
    operationId: 'paginate'
  })
  @ApiOkResponse({ type: UsersPaginateSuccessResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('page')
  async paginate(@Query() usersPaginateDto: UsersPaginateDto): Promise<IPaginationResult<User>> {
    return this.userService.paginate({
      pageNo: usersPaginateDto.pageNo,
      pageSize: usersPaginateDto.pageSize 
    }, { username: usersPaginateDto.username || '' });
  }

  @ApiOperation({
    summary: '创建用户',
    operationId: 'create' 
  })
  @ApiOkResponse({ type: InsertSuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createUsersDto: CreateUsersDto) {
    return this.userService.create(createUsersDto);
  }

  @ApiOperation({
    summary: '删除用户',
    operationId: 'remove'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: DeleteSuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id) {
    return this.userService.remove(id);
  }

  @ApiOperation({
    summary: '获取指定id的用户数据',
    operationId: 'get'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: UserGetSuccessResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  get(@Param('id') id):Promise<User> {
    return this.userService.findOne(id);
  }


  @ApiOperation({
    summary: '修改指定id的用户数据',
    operationId: 'update'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: UpdateSuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param('id') id, @Body() userUpdateDto:UserUpdateDto) {
    return this.userService.update(id, userUpdateDto);
  }

  @ApiOperation({
    summary: '当前登录用户注销账号',
    operationId: 'removeSession'
  })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Delete('session')
  async removeSession(@Req() req) {
    return this.userService.remove(req.user.id);
  }

  @ApiOperation({
    summary: '绑定微信用户',
    operationId: 'bindWeixinSession'
  })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Post('bindWeixinSession')
  bindWeixinSession(@Body() dto: UsersBindWeixinDto, @Req() req) {
    return this.userService.bindWeixin(req.user.id, dto.appid, dto.code);
  }

  @ApiOperation({
    summary: '绑定手机号',
    operationId: 'bindMobileSession'
  })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Post('bindMobileSession')
  bindMobileSession(@Body() dto: UsersBindMobileDto, @Req() req) {
    return this.userService.bindMobile(req.user.id, dto.mobile, dto.code);
  }

  @ApiOperation({
    summary: '绑定小程序手机号',
    operationId: 'bindMpMobileSession'
  })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Post('bindMpMobileSession')
  bindMpMobileSession(@Body() dto: UsersBindWeixinDto, @Req() req) {
    return this.userService.bindMpMobile(req.user.id, dto.appid, dto.code);
  }


  @ApiOperation({
    summary: '绑定用户名',
    operationId: 'bindUsernameSession'
  })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Post('bindUsernameSession')
  bindUsernameSession(@Body() dto: UsersBindUsernameDto, @Req() req) {
    return this.userService.bindUsername(req.user.id, dto.username, dto.password);
  }
}
