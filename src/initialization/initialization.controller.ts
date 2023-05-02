import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InsertSuccessResult } from 'src/common-model';
import { CreateSuperAdminDto } from './dtos/create-cuper-admin.dto';
import { InitializationService } from './initialization.service';

@ApiTags('initialization')
@Controller('initialization')
export class InitializationController {
  constructor(private readonly initializationService: InitializationService) {}

  @ApiOperation({
    summary: '创建超级管理员',
    operationId: 'createSuperAdmin'
  })
  @ApiOkResponse({ type: InsertSuccessResult })
  @Post('create-super-admin')
  async createSuperAdmin(@Body() createSuperAdminDto: CreateSuperAdminDto) {
    return this.initializationService.createSuperAdmin(createSuperAdminDto);
  }
}
