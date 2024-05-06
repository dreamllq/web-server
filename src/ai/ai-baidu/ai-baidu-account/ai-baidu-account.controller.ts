import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards, Query, Req } from '@nestjs/common';
import { AiBaiduAccountService } from './ai-baidu-account.service';
import { CreateAiBaiduAccountDto } from './dto/create-ai-baidu-account.dto';
import { UpdateAiBaiduAccountDto } from './dto/update-ai-baidu-account.dto';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { DeleteSuccessResult, InsertSuccessResult, UpdateSuccessResult } from 'src/common-model';
import { AiBaiduAccountPaginateDto } from './dto/paginate.dto';
import { AiBaiduAccountPaginateResponse } from './responses/paginate.res';
import { AiBaiduAccountGetResponse } from './responses/get.res';
import { AiBaiduAccountGetAllResponse } from './responses/get-all.res';

@ApiTags('ai-baidu-account')
@UseInterceptors(new TransformInterceptor())
@Controller('ai/baidu/account')
export class AiBaiduAccountController {
  constructor(private readonly aiBaiduAccountService: AiBaiduAccountService) {}

  @ApiOperation({
    summary: '新增百度账号信息',
    operationId: 'create'
  })
  @ApiOkResponse({ type: InsertSuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createAiBaiduAccountDto: CreateAiBaiduAccountDto, @Req() req) {
    return this.aiBaiduAccountService.create(createAiBaiduAccountDto, { creator: req.user.id });
  }

  @ApiOperation({
    summary: '获取所有报读账号信息',
    operationId: 'getAll'
  })
  @ApiOkResponse({ type: AiBaiduAccountGetAllResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.aiBaiduAccountService.findAll();
  }

  @ApiOperation({
    summary: '获取分页百度账号信息',
    operationId: 'paginate'
  })
  @ApiOkResponse({ type: AiBaiduAccountPaginateResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('paginate')
  paginate(@Query() dto: AiBaiduAccountPaginateDto) {
    return this.aiBaiduAccountService.paginate({
      pageNo: dto.pageNo,
      pageSize: dto.pageSize
    });
  }

  @ApiOperation({
    summary: '获取指定id百度账号信息',
    operationId: 'get' 
  })
  @ApiOkResponse({ type: AiBaiduAccountGetResponse })
  @ApiParam({ name: 'id' })
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aiBaiduAccountService.findOne(id);
  }

  @ApiOperation({
    summary: '更新指定id百度账号信息',
    operationId: 'update'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: UpdateSuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAiBaiduAccountDto: UpdateAiBaiduAccountDto) {
    return this.aiBaiduAccountService.update(id, updateAiBaiduAccountDto);
  }

  @ApiOperation({
    summary: '删除百度账号信息',
    operationId: 'remove'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: DeleteSuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aiBaiduAccountService.remove(id);
  }
}
