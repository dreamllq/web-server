import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AiBaiduSessionService } from './ai-baidu-session.service';
import { CreateAiBaiduSessionDto } from './dto/create-ai-baidu-session.dto';
import { UpdateAiBaiduSessionDto } from './dto/update-ai-baidu-session.dto';

@Controller('ai-baidu-session')
export class AiBaiduSessionController {
  constructor(private readonly aiBaiduSessionService: AiBaiduSessionService) {}

  @Post()
  create(@Body() createAiBaiduSessionDto: CreateAiBaiduSessionDto) {
    return this.aiBaiduSessionService.create(createAiBaiduSessionDto);
  }

  @Get()
  findAll() {
    return this.aiBaiduSessionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aiBaiduSessionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAiBaiduSessionDto: UpdateAiBaiduSessionDto) {
    return this.aiBaiduSessionService.update(+id, updateAiBaiduSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aiBaiduSessionService.remove(+id);
  }
}
