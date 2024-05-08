import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards, Query, Req } from '@nestjs/common';
import { AiBaiduSessionService } from './ai-baidu-session.service';
import { CreateAiBaiduSessionDto } from './dto/create-ai-baidu-session.dto';
import { UpdateAiBaiduSessionDto } from './dto/update-ai-baidu-session.dto';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { DeleteSuccessResult, InsertSuccessResult, UpdateSuccessResult } from 'src/common-model';
import { AuthGuard } from '@nestjs/passport';
import { AiBaiduSessionGetAllResponse } from './responses/get-all.res';
import { AiBaiduSessionPaginateResponse } from './responses/paginate.res';
import { AiBaiduSessionPaginateDto } from './dto/paginate.dto';
import { AiBaiduSessionGetResponse } from './responses/get.res';

@ApiTags('ai-baidu-session')
@UseInterceptors(new TransformInterceptor())
@Controller('ai/baidu/session')
export class AiBaiduSessionController {
  constructor(private readonly aiBaiduSessionService: AiBaiduSessionService) {}

  @ApiOperation({
    summary: '新增会话',
    operationId: 'create'
  })
  @ApiOkResponse({ type: InsertSuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createAiBaiduSessionDto: CreateAiBaiduSessionDto, @Req() req) {
    return this.aiBaiduSessionService.create(createAiBaiduSessionDto, { creator: req.user.id });
  }

  @ApiOperation({
    summary: '获取所有会话',
    operationId: 'getAll'
  })
  @ApiOkResponse({ type: AiBaiduSessionGetAllResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.aiBaiduSessionService.findAll();
  }

  @ApiOperation({
    summary: '获取分页会话',
    operationId: 'paginate'
  })
  @ApiOkResponse({ type: AiBaiduSessionPaginateResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('paginate')
  paginate(@Query() dto: AiBaiduSessionPaginateDto) {
    return this.aiBaiduSessionService.paginate({
      pageNo: dto.pageNo,
      pageSize: dto.pageSize
    });
  }

  @ApiOperation({
    summary: '获取指定id会话',
    operationId: 'get' 
  })
  @ApiOkResponse({ type: AiBaiduSessionGetResponse })
  @ApiParam({ name: 'id' })
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aiBaiduSessionService.findOne(id);
  }

  @ApiOperation({
    summary: '更新指定id会话',
    operationId: 'update'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: UpdateSuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAiBaiduSessionDto: UpdateAiBaiduSessionDto) {
    return this.aiBaiduSessionService.update(id, updateAiBaiduSessionDto);
  }

  @ApiOperation({
    summary: '删除服务',
    operationId: 'remove'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: DeleteSuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aiBaiduSessionService.remove(id);
  }
}
