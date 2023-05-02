import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { ForumCommentService } from './forum-comment.service';
import { AuthGuard } from '@nestjs/passport';
import { ForumCommentCreateDto } from './dtos/create.dto';
import { SuccessResult } from 'src/common-model';
import { ForumCommentGetAllResponse } from './responses/get-all.res';
import { ForumCommentGetResponse } from './responses/get.res';
import { ForumCommentPaginateDto } from './dtos/paginate.dto';
import { ForumCommentPaginateResponse } from './responses/paginate.res';
import { ForumCommentGetCountResponse } from './responses/get-count.res';

@ApiTags('forumComment')
@UseInterceptors(new TransformInterceptor())
@Controller('forum/comment')
export class ForumCommentController {
  constructor(
    private readonly forumCommentService: ForumCommentService
  ) {}

  @ApiOperation({
    operationId: 'create',
    summary: '创建评论' 
  })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: ForumCommentCreateDto, @Req() req) {
    return this.forumCommentService.create({
      creatorId: req.user.id,
      ...dto
    });
  }

  @ApiOperation({
    operationId: 'remove',
    summary: '删除指定id评论' 
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id) {
    return this.forumCommentService.remove(id);
  }

  @ApiOperation({
    operationId: 'getAll',
    summary: '获取帖子下所有评论' 
  })
  @ApiQuery({ name: 'postId' })
  @ApiOkResponse({ type: ForumCommentGetAllResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll(@Query('postId') postId) {
    return this.forumCommentService.findAll({ postId });
  }


  @ApiOperation({
    operationId: 'get',
    summary: '获取指定id评论' 
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: ForumCommentGetResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  get(@Param('id') id) {
    return this.forumCommentService.findOne(id);
  }

  @ApiOperation({
    operationId: 'paginate',
    summary: '获取帖子下分页评论' 
  })
  @ApiOkResponse({ type: ForumCommentPaginateResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('page/all')
  paginate(@Query() dto: ForumCommentPaginateDto) {
    return this.forumCommentService.paginate({
      pageNo: dto.pageNo,
      pageSize: dto.pageSize
    }, {
      postId: dto.postId,
      content: dto.content 
    });
  }

  @ApiOperation({
    operationId: 'paginateSession',
    summary: '获取帖子下登录用户的分页评论' 
  })
  @ApiOkResponse({ type: ForumCommentPaginateResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('page/session')
  paginateSession(@Query() dto: ForumCommentPaginateDto, @Req() req) {
    return this.forumCommentService.paginate({
      pageNo: dto.pageNo,
      pageSize: dto.pageSize
    }, {
      postId: dto.postId,
      creatorId: req.user.id,
      content: dto.content
    });
  }

  @ApiOperation({
    operationId: 'getCount',
    summary: '获取帖子下评论数量' 
  })
  @ApiQuery({ name: 'postId' })
  @ApiOkResponse({ type: ForumCommentGetCountResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('count/all')
  getCount(@Query('postId') postId) {
    return this.forumCommentService.getCount({ postId });
  }

  @ApiOperation({
    operationId: 'getCountSession',
    summary: '获取帖子下当前登录用户的评论数量' 
  })
  @ApiQuery({ name: 'postId' })
  @ApiOkResponse({ type: ForumCommentGetCountResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('count/session')
  getCountSession(@Query('postId') postId, @Req() req) {
    return this.forumCommentService.getCount({
      creatorId: req.user.id,
      postId 
    });
  }
}
