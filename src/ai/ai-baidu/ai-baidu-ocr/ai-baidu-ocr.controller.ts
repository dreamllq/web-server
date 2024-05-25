import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards, Req, Query } from '@nestjs/common';
import { AiBaiduOcrService } from './ai-baidu-ocr.service';
import { CreateAiBaiduOcrDto } from './dto/create-ai-baidu-ocr.dto';
import { UpdateAiBaiduOcrDto } from './dto/update-ai-baidu-ocr.dto';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { InsertSuccessResult } from 'src/common-model';
import { AuthGuard } from '@nestjs/passport';
import { AiBaiduOcrGetAllResponse } from './responses/get-all.res';
import { AiBaiduOcrPaginateResponse } from './responses/paginate.res';
import { AiBaiduOcrPaginateDto } from './dto/paginate.dto';
import { AiBaiduOcrGetResponse } from './responses/get.res';

@ApiTags('ai-baidu-ocr')
@UseInterceptors(new TransformInterceptor())
@Controller('ai/baidu/ocr')
export class AiBaiduOcrController {
  constructor(private readonly aiBaiduOcrService: AiBaiduOcrService) {}

  @ApiOperation({
    summary: '新增ocr任务',
    operationId: 'create'
  })
  @ApiOkResponse({ type: InsertSuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createAiBaiduOcrDto: CreateAiBaiduOcrDto, @Req() req) {
    return this.aiBaiduOcrService.create(createAiBaiduOcrDto, { creator: req.user.id });
  }

  @ApiOperation({
    summary: '获取所有ocr任务',
    operationId: 'getAll'
  })
  @ApiOkResponse({ type: AiBaiduOcrGetAllResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.aiBaiduOcrService.findAll();
  }

  @ApiOperation({
    summary: '获取分页ocr任务',
    operationId: 'paginate'
  })
  @ApiOkResponse({ type: AiBaiduOcrPaginateResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('paginate')
  paginate(@Query() dto: AiBaiduOcrPaginateDto) {
    return this.aiBaiduOcrService.paginate({
      pageNo: dto.pageNo,
      pageSize: dto.pageSize
    });
  }

  @ApiOperation({
    summary: '获取指定id ocr任务',
    operationId: 'get' 
  })
  @ApiOkResponse({ type: AiBaiduOcrGetResponse })
  @ApiParam({ name: 'id' })
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aiBaiduOcrService.findOne(id);
  }
}
