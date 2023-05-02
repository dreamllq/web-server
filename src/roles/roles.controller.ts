import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { DeleteSuccessResult, InsertSuccessResult, UpdateSuccessResult } from 'src/common-model';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { IPaginationResult } from 'src/types';
import { CreateRolesDto } from './dtos/create.dto';
import { RolePaginateDto } from './dtos/paginate.dto';
import { UpdateRoleDto } from './dtos/update.dto';
import { RoleGetAllSuccessResponse } from './responses/get-all.res';
import { RoleGetSuccessResponse } from './responses/get.res';
import { RolesPaginateSuccessResponse } from './responses/paginate.res';
import { Role } from './role.entity';
import { RolesService } from './roles.service';

@ApiTags('roles')
@UseInterceptors(new TransformInterceptor())
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  
  @ApiOperation({
    summary: '获取所有角色数据',
    operationId: 'getAll'
  })
  @ApiOkResponse({ type: RoleGetAllSuccessResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @ApiOperation({
    summary: '获取分页角色数据',
    operationId: 'paginate'
  })
  @ApiOkResponse({ type: RolesPaginateSuccessResponse })
  @Get('page')
  paginate(@Query() rolePaginateDto:RolePaginateDto): Promise<IPaginationResult<Role>> {
    return this.rolesService.paginate({
      pageNo: rolePaginateDto.pageNo,
      pageSize: rolePaginateDto.pageSize 
    }, { name: rolePaginateDto.name || '' });
  }

  @ApiOperation({
    summary: '创建角色',
    operationId: 'create'
  })
  @ApiOkResponse({ type: InsertSuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createRolesDto: CreateRolesDto, @Req() req) {
    return this.rolesService.create(createRolesDto, req.user.id);
  }

  @ApiOperation({
    summary: '删除角色',
    operationId: 'remove'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: DeleteSuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id) {
    return this.rolesService.remove(id);
  }

  @ApiOperation({
    summary: '获取指定id角色信息',
    operationId: 'get' 
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: RoleGetSuccessResponse })
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  get(@Param('id') id): Promise<Role> {
    return this.rolesService.findOne(id);
  }

  @ApiOperation({
    summary: '更新指定id角色数据',
    operationId: 'update'
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: UpdateSuccessResult })
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }
}
