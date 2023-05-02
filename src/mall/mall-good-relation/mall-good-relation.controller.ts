import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { SuccessResult } from 'src/common-model';
import { AuthGuard } from '@nestjs/passport';
import { MallGoodRelationService } from './mall-good-relation.service';
import { MallGoodRelationCreateDto } from './dtos/create.dto';
import { MallGoodRelationGetWidthFilter } from './dtos/get-width-filter.dto';
import { MallGoodRelationGetResponse } from './responses/get.res';

@ApiTags('mallGoodRelation')
@UseInterceptors(new TransformInterceptor())
@Controller('mall/good-relation')
export class MallGoodRelationController {
  constructor(private readonly mallGoodRelationService: MallGoodRelationService) {}

  @ApiOperation({
    summary: '创建关系',
    operationId: 'create'
  })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: MallGoodRelationCreateDto, @Req() req) {
    return this.mallGoodRelationService.create({
      goodId: dto.goodId,
      type: dto.type,
      userId: req.user.id
    });
  }

  @ApiOperation({
    summary: '删除关系',
    operationId: 'remove'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id) {
    return this.mallGoodRelationService.remove(id);
  }

  @ApiOperation({
    summary: '筛选一个关系',
    operationId: 'getWidthFilter'
  })
  @ApiOkResponse({ type: MallGoodRelationGetResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('item')
  getWidthFilter(@Query() dto: MallGoodRelationGetWidthFilter) {
    return this.mallGoodRelationService.findOneWidthFilter(dto);
  }
}
