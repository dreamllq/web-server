import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { AreaService } from './area.service';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { AreaResponse } from './responses/area.res';
import { TreeDataResponse } from './responses/tree-data.res';

@ApiTags('area')
@UseInterceptors(new TransformInterceptor())
@Controller('area')
export class AreaController {
  constructor(
    private readonly areaService: AreaService
  ) {}

  @ApiOperation({
    operationId: 'getProvinces',
    summary: '获取省份列表' 
  })
  @ApiQuery({ name: 'countryId' })
  @ApiOkResponse({ type: AreaResponse })
  @Get('provinces')
  getProvinces(@Query('countryId') countryId) {
    return this.areaService.getAreasByParentId(countryId);
  }

  @ApiOperation({
    operationId: 'getCities',
    summary: '获取城市列表' 
  })
  @ApiQuery({ name: 'provinceId' })
  @ApiOkResponse({ type: AreaResponse })
  @Get('cities')
  getCities(@Query('provinceId') provinceId) {
    return this.areaService.getAreasByParentId(provinceId);
  }

  @ApiOperation({
    operationId: 'getRegions',
    summary: '获取区列表' 
  })
  @ApiQuery({ name: 'cityId' })
  @ApiOkResponse({ type: AreaResponse })
  @Get('regions')
  getRegions(@Query('cityId') cityId) {
    return this.areaService.getAreasByParentId(cityId);
  }
  
  @ApiOperation({
    operationId: 'getTreeData',
    summary: '获取省市区结构' 
  })
  @ApiOkResponse({ type: TreeDataResponse })
  @Get('treeData')
  getTreeData() {
    return this.areaService.getTreeData();
  }
}
