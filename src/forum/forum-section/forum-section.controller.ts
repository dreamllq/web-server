import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { ForumSectionCreateDto } from './dtos/create.dto';
import { ForumSectionService } from './forum-section.service';
import { SuccessResult } from 'src/common-model';
import { ForumSectionGetResponse } from './responses/get.res';
import { ForumSectionGetAllResponse } from './responses/get-all.res';
import { ForumSectionUpdateDto } from './dtos/update.dto';
import { ForumSectionPaginateDto } from './dtos/paginate.dto';
import { ForumSectionPaginateResponse } from './responses/paginate.res';

@ApiTags('forumSection')
@UseInterceptors(new TransformInterceptor())
@Controller('forum/section')
export class ForumSectionController {

  constructor(
    private readonly forumSectionService: ForumSectionService 
  ) {}

  @ApiOperation({
    operationId: 'getAll',
    summary: '获取所有论坛版块信息' 
  })
  @ApiOkResponse({ type: ForumSectionGetAllResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll() {
    return this.forumSectionService.findAll();
  }

  @ApiOperation({
    operationId: 'get',
    summary: '获取指定id论坛版块信息' 
  })
  @ApiOkResponse({ type: ForumSectionGetResponse })
  @ApiParam({ name: 'id' })
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  get(@Param('id') id) {
    return this.forumSectionService.findOne(id);
  }

  @ApiOperation({
    operationId: 'create',
    summary: '创建板块' 
  })
  @ApiOkResponse({ type: SuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: ForumSectionCreateDto, @Req() req) {
    return this.forumSectionService.create({
      name: dto.name,
      desc: dto.desc,
      creatorId: req.user.id
    });
  }

  @ApiOperation({
    operationId: 'remove',
    summary: '删除指定id板块' 
  })
  @ApiOkResponse({ type: SuccessResult })
  @ApiParam({ name: 'id' })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id) {
    return this.forumSectionService.remove(id);
  }

  @ApiOperation({
    operationId: 'update',
    summary: '更新指定id板块' 
  })
  @ApiOkResponse({ type: SuccessResult })
  @ApiParam({ name: 'id' })
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id, @Body() dto: ForumSectionUpdateDto) {
    return this.forumSectionService.update(id, {
      name: dto.name,
      desc: dto.desc
    });
  }

  @ApiOperation({
    operationId: 'paginate',
    summary: '板块分页数据' 
  })
  @ApiOkResponse({ type: ForumSectionPaginateResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('page/all')
  async paginate(@Query() dto: ForumSectionPaginateDto) {
    return this.forumSectionService.paginate({
      pageNo: dto.pageNo,
      pageSize: dto.pageSize
    }, { name: dto.name || '' });
  }

  @ApiOperation({
    operationId: 'paginateSession',
    summary: '登录人的板块分页数据' 
  })
  @ApiOkResponse({ type: ForumSectionPaginateResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get('page/session')
  paginateSession(@Query() dto: ForumSectionPaginateDto, @Req() req) {
    return this.forumSectionService.paginate({
      pageNo: dto.pageNo,
      pageSize: dto.pageSize
    }, {
      name: dto.name || '',
      creatorId: req.user.id 
    });
  }
}
