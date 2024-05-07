import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AiBaiduServiceService } from './ai-baidu-service.service';
import { CreateAiBaiduServiceDto } from './dto/create-ai-baidu-service.dto';
import { UpdateAiBaiduServiceDto } from './dto/update-ai-baidu-service.dto';

@Controller('ai-baidu-service')
export class AiBaiduServiceController {
  constructor(private readonly aiBaiduServiceService: AiBaiduServiceService) {}

  @Post()
  create(@Body() createAiBaiduServiceDto: CreateAiBaiduServiceDto) {
    return this.aiBaiduServiceService.create(createAiBaiduServiceDto);
  }

  @Get()
  findAll() {
    return this.aiBaiduServiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aiBaiduServiceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAiBaiduServiceDto: UpdateAiBaiduServiceDto) {
    return this.aiBaiduServiceService.update(+id, updateAiBaiduServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aiBaiduServiceService.remove(+id);
  }
}
