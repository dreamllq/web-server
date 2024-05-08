import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AiBaiduMessageService } from './ai-baidu-message.service';
import { CreateAiBaiduMessageDto } from './dto/create-ai-baidu-message.dto';
import { UpdateAiBaiduMessageDto } from './dto/update-ai-baidu-message.dto';

@Controller('ai-baidu-message')
export class AiBaiduMessageController {
  constructor(private readonly aiBaiduMessageService: AiBaiduMessageService) {}

  @Post()
  create(@Body() createAiBaiduMessageDto: CreateAiBaiduMessageDto) {
    return this.aiBaiduMessageService.create(createAiBaiduMessageDto);
  }

  @Get()
  findAll() {
    return this.aiBaiduMessageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aiBaiduMessageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAiBaiduMessageDto: UpdateAiBaiduMessageDto) {
    return this.aiBaiduMessageService.update(+id, updateAiBaiduMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aiBaiduMessageService.remove(+id);
  }
}
