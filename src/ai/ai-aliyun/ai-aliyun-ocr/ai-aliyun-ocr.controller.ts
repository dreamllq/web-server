import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AiAliyunOcrService } from './ai-aliyun-ocr.service';
import { CreateAiAliyunOcrDto } from './dto/create-ai-aliyun-ocr.dto';
import { UpdateAiAliyunOcrDto } from './dto/update-ai-aliyun-ocr.dto';

@Controller('ai-aliyun-ocr')
export class AiAliyunOcrController {
  constructor(private readonly aiAliyunOcrService: AiAliyunOcrService) {}

  @Post()
  create(@Body() createAiAliyunOcrDto: CreateAiAliyunOcrDto) {
    return this.aiAliyunOcrService.create(createAiAliyunOcrDto);
  }

  @Get()
  findAll() {
    return this.aiAliyunOcrService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aiAliyunOcrService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAiAliyunOcrDto: UpdateAiAliyunOcrDto) {
    return this.aiAliyunOcrService.update(+id, updateAiAliyunOcrDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aiAliyunOcrService.remove(+id);
  }
}
