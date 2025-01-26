import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BiViewMetaService } from './bi-view-meta.service';
import { CreateBiViewMetaDto } from './dto/create-bi-view-meta.dto';
import { UpdateBiViewMetaDto } from './dto/update-bi-view-meta.dto';

@Controller('bi-view-meta')
export class BiViewMetaController {
  constructor(private readonly biViewMetaService: BiViewMetaService) {}

  @Post()
  create(@Body() createBiViewMetaDto: CreateBiViewMetaDto) {
    return this.biViewMetaService.create(createBiViewMetaDto);
  }

  @Get()
  findAll() {
    return this.biViewMetaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.biViewMetaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBiViewMetaDto: UpdateBiViewMetaDto) {
    return this.biViewMetaService.update(+id, updateBiViewMetaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.biViewMetaService.remove(+id);
  }
}
