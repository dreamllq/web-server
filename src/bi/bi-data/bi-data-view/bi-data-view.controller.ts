import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { BiDataViewService } from './bi-data-view.service';
import { CreateBiDataViewDto } from './dto/create-bi-data-view.dto';
import { UpdateBiDataViewDto } from './dto/update-bi-data-view.dto';
import { BiDataViewGetResponse } from './responses/get.res';

@ApiTags('biDataView')
@UseInterceptors(new TransformInterceptor())
@Controller('bi/data/view')
export class BiDataViewController {
  constructor(private readonly biDataViewService: BiDataViewService) {}

  @ApiOperation({
    operationId: 'get',
    summary: '数据数据预览' 
  })
  @ApiOkResponse({ type: BiDataViewGetResponse })
  @ApiParam({ name: 'metaId' })
  @UseGuards(AuthGuard('jwt'))
  @Get(':metaId')
  get(@Param('metaId') metaId:string) {
    return this.biDataViewService.view(metaId);
  }
}
