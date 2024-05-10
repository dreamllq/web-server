import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AiAliyunAccountService } from './ai-aliyun-account.service';
import { CreateAiAliyunAccountDto } from './dto/create-ai-aliyun-account.dto';
import { UpdateAiAliyunAccountDto } from './dto/update-ai-aliyun-account.dto';

@Controller('ai-aliyun-account')
export class AiAliyunAccountController {
  constructor(private readonly aiAliyunAccountService: AiAliyunAccountService) {}

  @Post()
  create(@Body() createAiAliyunAccountDto: CreateAiAliyunAccountDto) {
    return this.aiAliyunAccountService.create(createAiAliyunAccountDto);
  }

  @Get()
  findAll() {
    return this.aiAliyunAccountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aiAliyunAccountService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAiAliyunAccountDto: UpdateAiAliyunAccountDto) {
    return this.aiAliyunAccountService.update(+id, updateAiAliyunAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aiAliyunAccountService.remove(+id);
  }
}
