import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { SuccessResult } from 'src/common-model';
import { AuthGuard } from '@nestjs/passport';
import { MallGoodCommentService } from './mall-good-comment.service';
import { MallGoodCommentCreateDto } from './dtos/create.dto';
import { MallGoodCommentPaginateWidthCursorDto } from './dtos/paginate-width-cursor.dto';
import { MallGoodCommentPaginateWidthCursorResponse } from './responses/paginate-width-cursor.res';
import { MallGoodCommentPaginateDto } from './dtos/paginate.dto';
import { MallGoodCommentPaginateResponse } from './responses/paginate.res';

@ApiTags('mallGoodComment')
@UseInterceptors(new TransformInterceptor())
@Controller('mall/good-comment')
export class MallGoodCommentController {
  constructor(private readonly mallGoodCommentService: MallGoodCommentService) {}

  @ApiOperation({
    summary: '评论',
    operationId: 'create'
  })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: MallGoodCommentCreateDto, @Req() req) {
    return this.mallGoodCommentService.create({
      creatorId: req.user.id,
      ...dto
    });
  }

  @ApiOperation({
    summary: '删除评论',
    operationId: 'remove'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id) {
    return this.mallGoodCommentService.remove(id);
  }

  @ApiOperation({
    summary: '游标分页',
    operationId: 'paginateWidthCursor'
  })
  @ApiOkResponse({ type: MallGoodCommentPaginateWidthCursorResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('pageByCursor')
  paginateWidthCursor(@Query() dto: MallGoodCommentPaginateWidthCursorDto, @Req() req) {
    return this.mallGoodCommentService.paginateWidthCursor({
      count: dto.count,
      afterId: dto.afterId
    }, { goodId: dto.goodId });
  }

  @ApiOperation({
    summary: '分页',
    operationId: 'paginate'
  })
  @ApiOkResponse({ type: MallGoodCommentPaginateResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('page')
  paginate(@Query() dto: MallGoodCommentPaginateDto) {
    return this.mallGoodCommentService.paginate({
      pageNo: dto.pageNo,
      pageSize: dto.pageSize 
    }, { goodId: dto.goodId });
  }
}
