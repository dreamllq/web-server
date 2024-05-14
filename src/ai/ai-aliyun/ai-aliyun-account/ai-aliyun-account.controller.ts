import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards, Req, Query } from '@nestjs/common';
import { AiAliyunAccountService } from './ai-aliyun-account.service';
import { CreateAiAliyunAccountDto } from './dto/create-ai-aliyun-account.dto';
import { UpdateAiAliyunAccountDto } from './dto/update-ai-aliyun-account.dto';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { DeleteSuccessResult, InsertSuccessResult, UpdateSuccessResult } from 'src/common-model';
import { AuthGuard } from '@nestjs/passport';
import { AiAliyunAccountGetAllResponse } from './responses/get-all.res';
import { AiAliyunAccountPaginateResponse } from './responses/paginate.res';
import { AiAliyunAccountGetResponse } from './responses/get.res';
import { AiAliyunAccountPaginateDto } from './dto/paginate.dto';

@ApiTags('ai-aliyun-account')
@UseInterceptors(new TransformInterceptor())
@Controller('ai/aliyun/account')
export class AiAliyunAccountController {
  constructor(private readonly aiAliyunAccountService: AiAliyunAccountService) {}

  @ApiOperation({
    summary: '新增阿里云账号信息',
    operationId: 'create'
  })
  @ApiOkResponse({ type: InsertSuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createAiAliyunAccountDto: CreateAiAliyunAccountDto, @Req() req) {
    return this.aiAliyunAccountService.create(createAiAliyunAccountDto, { creator: req.user.id });
  }

  @ApiOperation({
    summary: '获取所有阿里云账号信息',
    operationId: 'getAll'
  })
  @ApiOkResponse({ type: AiAliyunAccountGetAllResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.aiAliyunAccountService.findAll();
  }

  @ApiOperation({
    summary: '获取分页阿里云账号信息',
    operationId: 'paginate'
  })
  @ApiOkResponse({ type: AiAliyunAccountPaginateResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('paginate')
  paginate(@Query() dto: AiAliyunAccountPaginateDto) {
    return this.aiAliyunAccountService.paginate({
      pageNo: dto.pageNo,
      pageSize: dto.pageSize
    });
  }

  @ApiOperation({
    summary: '获取指定id百度账号信息',
    operationId: 'get' 
  })
  @ApiOkResponse({ type: AiAliyunAccountGetResponse })
  @ApiParam({ name: 'id' })
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aiAliyunAccountService.findOne(id);
  }

  @ApiOperation({
    summary: '更新指定id阿里云账号信息',
    operationId: 'update'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: UpdateSuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAiAliyunAccountDto: UpdateAiAliyunAccountDto) {
    return this.aiAliyunAccountService.update(id, updateAiAliyunAccountDto);
  }

  @ApiOperation({
    summary: '删除阿里云账号信息',
    operationId: 'remove'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: DeleteSuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aiAliyunAccountService.remove(id);
  }
}
