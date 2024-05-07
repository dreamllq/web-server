import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AiServiceTypeService } from './ai-service-type.service';
import { CreateAiServiceTypeDto } from './dto/create-ai-service-type.dto';
import { UpdateAiServiceTypeDto } from './dto/update-ai-service-type.dto';

@Controller('ai-service-type')
export class AiServiceTypeController {
  constructor(private readonly aiServiceTypeService: AiServiceTypeService) {}

  @Post()
  create(@Body() createAiServiceTypeDto: CreateAiServiceTypeDto) {
    return this.aiServiceTypeService.create(createAiServiceTypeDto);
  }

  @Get()
  findAll() {
    return this.aiServiceTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aiServiceTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAiServiceTypeDto: UpdateAiServiceTypeDto) {
    return this.aiServiceTypeService.update(+id, updateAiServiceTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aiServiceTypeService.remove(+id);
  }
}
