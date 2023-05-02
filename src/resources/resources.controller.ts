import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiProduces, ApiProperty, ApiQuery, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { IPaginationResult } from 'src/types';
import { CreateResourceDto } from './dtos/create-resource.dto';
import { UpdateResourceDto } from './dtos/update-resource.dto';
import { Resource } from './resource.entity';
import { ResourcesService } from './resources.service';
import { ResourceGetAllSuccessResult } from './responses/get-all.res';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { ResourcePaginateSuccessResult } from './responses/paginate.res';
import { DeleteSuccessResult, InsertSuccessResult, UpdateSuccessResult } from 'src/common-model';
import { ResourceGetSuccessResult } from './responses/get.res';
import { AuthGuard } from '@nestjs/passport';
import { ResourcesPaginateDto } from './dtos/paginate.dto';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';


@ApiTags('resources')
@UseInterceptors(new TransformInterceptor())
@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @ApiOperation({
    summary: '获取资源所有数据',
    operationId: 'getAll' 
  })
  @ApiOkResponse({ type: ResourceGetAllSuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll(): Promise<Resource[]> {
    return this.resourcesService.findAll();
  }

  @ApiOperation({
    summary: '获取资源分页数据',
    operationId: 'paginate' 
  })
  @ApiOkResponse({ type: ResourcePaginateSuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Get('page')
  paginate(@Query() resourcesPaginateDto: ResourcesPaginateDto): Promise<IPaginationResult<Resource>> {
    return this.resourcesService.paginate({
      pageNo: resourcesPaginateDto.pageNo,
      pageSize: resourcesPaginateDto.pageSize 
    }, { name: resourcesPaginateDto.name || '' });
  }

  @ApiOperation({
    summary: '创建资源',
    operationId: 'create' 
  })
  @ApiBody({ type: CreateResourceDto })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOkResponse({ type: InsertSuccessResult })
  create(@Body() createResourceDto: CreateResourceDto): Promise<InsertResult> {
    return this.resourcesService.create(createResourceDto);
  }

  @ApiOperation({
    summary: '获取指定id资源数据',
    operationId: 'get' 
  })
  @ApiOkResponse({ type: ResourceGetSuccessResult })
  @ApiParam({
    name: 'id',
    description: '资源id' 
  })
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  get(@Param('id') id): Promise<Resource> {
    return this.resourcesService.findOne(id);
  }

  @ApiOperation({
    summary: '删除资源',
    operationId: 'remove' 
  })
  @ApiParam({
    name: 'id',
    description: '资源id' 
  })
  @ApiOkResponse({ type: DeleteSuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id): Promise<DeleteResult> {
    return this.resourcesService.remove(id);
  }

  @ApiOperation({
    summary: '更新指定资源的所有数据',
    operationId: 'update' 
  })
  @ApiParam({
    name: 'id',
    description: '资源id' 
  })
  @ApiOkResponse({ type: UpdateSuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Body() updateResourceDto: UpdateResourceDto, @Param('id') id): Promise<UpdateResult> {
    return this.resourcesService.update(id, updateResourceDto);
  }
}
