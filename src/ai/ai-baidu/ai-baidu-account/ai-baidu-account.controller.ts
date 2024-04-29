import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AiBaiduAccountService } from './ai-baidu-account.service';
import { CreateAiBaiduAccountDto } from './dto/create-ai-baidu-account.dto';
import { UpdateAiBaiduAccountDto } from './dto/update-ai-baidu-account.dto';

@Controller('ai-baidu-account')
export class AiBaiduAccountController {
  constructor(private readonly aiBaiduAccountService: AiBaiduAccountService) {}

  @Post()
  create(@Body() createAiBaiduAccountDto: CreateAiBaiduAccountDto) {
    return this.aiBaiduAccountService.create(createAiBaiduAccountDto);
  }

  @Get()
  findAll() {
    return this.aiBaiduAccountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aiBaiduAccountService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAiBaiduAccountDto: UpdateAiBaiduAccountDto) {
    return this.aiBaiduAccountService.update(+id, updateAiBaiduAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aiBaiduAccountService.remove(+id);
  }
}
