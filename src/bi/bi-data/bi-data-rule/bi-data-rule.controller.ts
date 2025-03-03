import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BiDataRuleService } from './bi-data-rule.service';
import { CreateBiDataRuleDto } from './dto/create-bi-data-rule.dto';
import { UpdateBiDataRuleDto } from './dto/update-bi-data-rule.dto';

@Controller('bi-data-rule')
export class BiDataRuleController {
  constructor(private readonly biDataRuleService: BiDataRuleService) {}

  @Post()
  create(@Body() createBiDataRuleDto: CreateBiDataRuleDto) {
    return this.biDataRuleService.create(createBiDataRuleDto);
  }

  @Get()
  findAll() {
    return this.biDataRuleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.biDataRuleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBiDataRuleDto: UpdateBiDataRuleDto) {
    return this.biDataRuleService.update(+id, updateBiDataRuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.biDataRuleService.remove(+id);
  }
}
