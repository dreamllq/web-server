import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { SuccessResult } from 'src/common-model';
import { ForumPostService } from './forum-post.service';
import { ForumPostCreateDto } from './dtos/create.dto';
import { ForumPostUpdateDto } from './dtos/update.dto';
import { ForumPostGetAllResponse } from './responses/get-all.res';
import { ForumPostGetResponse } from './responses/get.res';
import { ForumPostPaginateDto } from './dtos/paginate.dto';
import { ForumPostPaginateResponse } from './responses/paginate.res';
import { ForumPostGetCountDto } from './dtos/get-count.dto';
import { ForumPostGetCountResponse } from './responses/get-count.res';
import { ForumPostGetDto } from './dtos/get.dto';
import { ForumPostPaginateByCursorDto } from './dtos/paginate-by-cursor.dto';

@ApiTags('forumPost')
@UseInterceptors(new TransformInterceptor())
@Controller('forum/post')
export class ForumPostController {
  constructor(private readonly forumPostService: ForumPostService) {}

  @ApiOperation({
    operationId: 'create',
    summary: '创建帖子' 
  })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: ForumPostCreateDto, @Req() req) {
    return this.forumPostService.create({
      title: dto.title,
      content: dto.content,
      images: dto.images,
      sectionId: dto.sectionId,
      creatorId: req.user.id
    });
  }

  @ApiOperation({
    operationId: 'remove',
    summary: '删除帖子' 
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id) {
    return this.forumPostService.remove(id);
  }

  @ApiOperation({
    operationId: 'update',
    summary: '更新指定id帖子' 
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id, @Body() dto: ForumPostUpdateDto) {
    return this.forumPostService.update(id, {
      title: dto.title,
      content: dto.content,
      images: dto.images
    });
  }

  @ApiOperation({
    operationId: 'getAll',
    summary: '获取所有帖子' 
  })
  @ApiQuery({ name: 'sectionId' })
  @ApiOkResponse({ type: ForumPostGetAllResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll(@Query('sectionId') sectionId) {
    return this.forumPostService.findAll({ sectionId });
  }

  @ApiOperation({
    operationId: 'get',
    summary: '获取指定id帖子' 
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: ForumPostGetResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  get(@Param('id') id, @Query() dto:ForumPostGetDto) {
    return this.forumPostService.findOne(id, {
      relations: {
        comments: dto.relationComments,
        section: dto.relationSection,
        collects: dto.relationCollects,
        zans: dto.relationZans
      }
    });
  }

  @ApiOperation({
    operationId: 'paginate',
    summary: '帖子分页数据' 
  })
  @ApiOkResponse({ type: ForumPostPaginateResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('page/all')
  paginate(@Query() dto: ForumPostPaginateDto) {
    return this.forumPostService.paginate({
      pageNo: dto.pageNo,
      pageSize: dto.pageSize
    }, {
      sectionId: dto.sectionId,
      title: dto.title 
    }, {
      relations: {
        comments: dto.relationComments,
        section: dto.relationSection,
        collects: dto.relationCollects,
        zans: dto.relationZans
      } 
    });
  }

  @ApiOperation({
    operationId: 'paginateSession',
    summary: '当前用户帖子分页数据' 
  })
  @ApiOkResponse({ type: ForumPostPaginateResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('page/session')
  paginateSession(@Query() dto: ForumPostPaginateDto, @Req() req) {
    return this.forumPostService.paginate({
      pageNo: dto.pageNo,
      pageSize: dto.pageSize
    }, {
      creatorId: req.user.id,
      sectionId: dto.sectionId,
      title: dto.title 
    }, {
      relations: {
        comments: dto.relationComments,
        section: dto.relationSection,
        collects: dto.relationCollects,
        zans: dto.relationZans
      } 
    });
  }

  @ApiOperation({
    operationId: 'paginateByCursor',
    summary: '帖子分页数据(游标)' 
  })
  @ApiOkResponse({ type: ForumPostPaginateResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('page/cursor/all')
  paginateByCursor(@Query() dto: ForumPostPaginateByCursorDto) {
    return this.forumPostService.paginateByCursor({
      versionId: dto.versionId,
      pageSize: dto.pageSize
    }, { sectionId: dto.sectionId }, {
      relations: {
        comments: dto.relationComments,
        section: dto.relationSection,
        collects: dto.relationCollects,
        zans: dto.relationZans
      } 
    });
  }

  @ApiOperation({
    operationId: 'getCount',
    summary: '获取帖子数量' 
  })
  @ApiOkResponse({ type: ForumPostGetCountResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('count/all')
  getCount(@Query() dto: ForumPostGetCountDto) {
    return this.forumPostService.getCount({ sectionId: dto.sectionId });
  }

  @ApiOperation({
    operationId: 'getCountSession',
    summary: '获取登录用户帖子数量' 
  })
  @ApiOkResponse({ type: ForumPostGetCountResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('count/session')
  getCountSession(@Query() dto: ForumPostGetCountDto, @Req() req) {
    return this.forumPostService.getCount({
      sectionId: dto.sectionId,
      creatorId: req.user.id 
    });
  }


}
