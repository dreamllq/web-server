import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';

import { BiDataRuleService } from './bi-data-rule.service';
import { CreateBiDataRuleDto } from './dto/create-bi-data-rule.dto';
import { UpdateBiDataRuleDto } from './dto/update-bi-data-rule.dto';
import { BiDataRuleGetResponse } from './responses/get.res';
import { SuccessResult } from 'src/common-model';

@ApiTags('biDataRule')
@UseInterceptors(new TransformInterceptor())
@Controller('bi/data')
export class BiDataRuleController {
  constructor(private readonly biDataRuleService: BiDataRuleService) {}

  @ApiOperation({
    operationId: 'get',
    summary: '获取指定id信息' 
  })
  @ApiOkResponse({ type: BiDataRuleGetResponse })
  @ApiParam({ name: 'metaId' })
  @UseGuards(AuthGuard('jwt'))
  @Get('meta/:metaId/rule')
  get(@Param('metaId') metaId) {
    return this.biDataRuleService.findOne(metaId);
  }

  @ApiOperation({
    operationId: 'create',
    summary: '创建' 
  })
  @ApiOkResponse({ type: SuccessResult })
  @ApiParam({ name: 'metaId' })
  @UseGuards(AuthGuard('jwt'))
  @Post('meta/:metaId/rule')
  create(@Body() dto: CreateBiDataRuleDto, @Param('metaId') metaId: string) {
    return this.biDataRuleService.create(metaId, dto);
  }
    
  @ApiOperation({
    operationId: 'update',
    summary: '更新指定id' 
  })
  @ApiOkResponse({ type: SuccessResult })
  @ApiParam({ name: 'id' })
  @UseGuards(AuthGuard('jwt'))
  @Put('rule/:id')
  update(@Param('id') id:string, @Body() dto: UpdateBiDataRuleDto) {
    return this.biDataRuleService.update(id, dto);
  }
}
