import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BiChartMetaService } from './bi-chart-meta.service';
import { CreateBiChartMetaDto } from './dto/create-bi-chart-meta.dto';
import { UpdateBiChartMetaDto } from './dto/update-bi-chart-meta.dto';

@Controller('bi-chart-meta')
export class BiChartMetaController {
  constructor(private readonly biChartMetaService: BiChartMetaService) {}

  @Post()
  create(@Body() createBiChartMetaDto: CreateBiChartMetaDto) {
    return this.biChartMetaService.create(createBiChartMetaDto);
  }

  @Get()
  findAll() {
    return this.biChartMetaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.biChartMetaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBiChartMetaDto: UpdateBiChartMetaDto) {
    return this.biChartMetaService.update(+id, updateBiChartMetaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.biChartMetaService.remove(+id);
  }
}
