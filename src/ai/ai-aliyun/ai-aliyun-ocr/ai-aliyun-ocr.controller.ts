import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards, Req, Query, Put } from '@nestjs/common';
import { AiAliyunOcrService } from './ai-aliyun-ocr.service';
import { CreateAiAliyunOcrDto } from './dto/create-ai-aliyun-ocr.dto';
import { UpdateAiAliyunOcrDto } from './dto/update-ai-aliyun-ocr.dto';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { InsertSuccessResult, UpdateSuccessResult } from 'src/common-model';
import { AuthGuard } from '@nestjs/passport';
import { AiAliyunOcrGetAllResponse } from './responses/get-all.res';
import { AiAliyunOcrPaginateDto } from './dto/paginate.dto';
import { AiAliyunOcrPaginateResponse } from './responses/paginate.res';
import { AiAliyunOcrGetResponse } from './responses/get.res';
import { AiAliyunOcrSdkService } from './ai-aliyun-ocr-sdk.service';

@ApiTags('ai-aliyun-ocr')
@UseInterceptors(new TransformInterceptor())
@Controller('ai/aliyun/ocr')
export class AiAliyunOcrController {
  constructor(
    private readonly aiAliyunOcrService: AiAliyunOcrService, 
    private readonly aiAliyunOcrSdkService:AiAliyunOcrSdkService
  ) {}

  @ApiOperation({
    summary: '新增ocr任务',
    operationId: 'create'
  })
  @ApiOkResponse({ type: InsertSuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createAiAliyunOcrDto: CreateAiAliyunOcrDto, @Req() req) {
    return this.aiAliyunOcrService.create(createAiAliyunOcrDto, { creator: req.user.id });
  }

  @ApiOperation({
    summary: '获取所有ocr任务',
    operationId: 'getAll'
  })
  @ApiOkResponse({ type: AiAliyunOcrGetAllResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.aiAliyunOcrService.findAll();
  }

  @ApiOperation({
    summary: '获取分页ocr任务',
    operationId: 'paginate'
  })
  @ApiOkResponse({ type: AiAliyunOcrPaginateResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('paginate')
  paginate(@Query() dto: AiAliyunOcrPaginateDto) {
    return this.aiAliyunOcrService.paginate({
      pageNo: dto.pageNo,
      pageSize: dto.pageSize
    });
  }

  @ApiOperation({
    summary: '获取指定id ocr任务',
    operationId: 'get' 
  })
  @ApiOkResponse({ type: AiAliyunOcrGetResponse })
  @ApiParam({ name: 'id' })
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aiAliyunOcrService.findOne(id);
  }

  @ApiOperation({
    summary: '执行指定id ocr任务',
    operationId: 'operate' 
  })
  @ApiOkResponse({ type: UpdateSuccessResult })
  @ApiParam({ name: 'id' })
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  operate(@Param('id') id: string) {
    return this.aiAliyunOcrSdkService.ocrOperate({ ocrId: id });
  }
}
