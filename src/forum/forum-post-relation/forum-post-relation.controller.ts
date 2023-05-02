import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { SuccessResult } from 'src/common-model';
import { ForumPostRelationService } from './forum-post-relation.service';
import { ForumPostRelationCreateDto } from './dtos/create.dto';
import { ForumPostRelationGetAllDto } from './dtos/get-all.dto';
import { ForumPostRelationGetAllResponse } from './responses/get-all.res';
import { ForumPostRelationPaginateDto } from './dtos/paginate.dto';
import { ForumPostRelationPaginateResponse } from './responses/paginate.res';
import { ForumPostRelationGetCountDto } from './dtos/get-count.dto';
import { ForumPostRelationGetCountResponse } from './responses/get-count.res';

@ApiTags('forumPostRelation')
@UseInterceptors(new TransformInterceptor())
@Controller('forum/post-relation')
export class ForumPostRelationController {
  constructor(private readonly forumPostRelationService: ForumPostRelationService) {}

  @ApiOperation({
    operationId: 'create',
    summary: '创建用户和帖子的关系' 
  })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: ForumPostRelationCreateDto, @Req() req) {
    return this.forumPostRelationService.create({
      creatorId: req.user.id,
      postId: dto.postId,
      type: dto.type
    });
  }

  @ApiOperation({
    operationId: 'remove',
    summary: '删除用户和帖子的关系' 
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id) {
    return this.forumPostRelationService.remove(id);
  }

  @ApiOperation({
    operationId: 'getAll',
    summary: '获取所有用户和帖子的关系' 
  })
  @ApiOkResponse({ type: ForumPostRelationGetAllResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll(@Query() dto: ForumPostRelationGetAllDto) {
    return this.forumPostRelationService.findAll({
      postId: dto.postId,
      type: dto.type 
    });
  }

  @ApiOperation({
    operationId: 'getAllSession',
    summary: '获取登录用户的所有用户和帖子的关系' 
  })
  @ApiOkResponse({ type: ForumPostRelationGetAllResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('session/info')
  getAllSession(@Query() dto: ForumPostRelationGetAllDto, @Req() req) {
    return this.forumPostRelationService.findAll({
      postId: dto.postId,
      type: dto.type,
      creatorId: req.user.id
    });
  }

  @ApiOperation({
    operationId: 'get',
    summary: '获取指定id的用户和帖子的关系' 
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  get(@Param('id') id) {
    return this.forumPostRelationService.findOne(id);
  }

  @ApiOperation({
    operationId: 'paginate',
    summary: '获取用户和帖子的关系的分页数据' 
  })
  @ApiOkResponse({ type: ForumPostRelationPaginateResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('page/all')
  paginate(@Query() dto: ForumPostRelationPaginateDto) {
    return this.forumPostRelationService.paginate({
      pageNo: dto.pageNo,
      pageSize: dto.pageSize
    }, {
      postId: dto.postId,
      type: dto.type
    });
  }

  @ApiOperation({
    operationId: 'paginateSession',
    summary: '获取登录用户的用户和帖子的关系的分页数据' 
  })
  @ApiOkResponse({ type: ForumPostRelationPaginateResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('page/session')
  paginateSession(@Query() dto: ForumPostRelationPaginateDto) {
    return this.forumPostRelationService.paginate({
      pageNo: dto.pageNo,
      pageSize: dto.pageSize
    }, {
      postId: dto.postId,
      type: dto.type
    });
  }

  @ApiOperation({
    operationId: 'getCount',
    summary: '获取用户和帖子的关系的数量' 
  })
  @ApiOkResponse({ type: ForumPostRelationGetCountResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('count/all')
  getCount(@Query() dto: ForumPostRelationGetCountDto) {
    return this.forumPostRelationService.getCount({
      postId: dto.postId,
      type: dto.type
    });
  }

  @ApiOperation({
    operationId: 'getCountSession',
    summary: '获取登录用户的用户和帖子的关系的数量' 
  })
  @ApiOkResponse({ type: ForumPostRelationGetCountResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('count/session')
  getCountSession(@Query() dto: ForumPostRelationGetCountDto, @Req() req) {
    return this.forumPostRelationService.getCount({
      postId: dto.postId,
      type: dto.type,
      creator: req.user.id
    });
  }
}
