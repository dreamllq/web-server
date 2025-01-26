import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BiDataMetaService } from './bi-data-meta.service';
import { CreateBiDataMetaDto } from './dto/create-bi-data-meta.dto';
import { UpdateBiDataMetaDto } from './dto/update-bi-data-meta.dto';

@Controller('bi-data-meta')
export class BiDataMetaController {
  constructor(private readonly biDataMetaService: BiDataMetaService) {}

  @Post()
  create(@Body() createBiDataMetaDto: CreateBiDataMetaDto) {
    return this.biDataMetaService.create(createBiDataMetaDto);
  }

  @Get()
  findAll() {
    return this.biDataMetaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.biDataMetaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBiDataMetaDto: UpdateBiDataMetaDto) {
    return this.biDataMetaService.update(+id, updateBiDataMetaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.biDataMetaService.remove(+id);
  }
}
