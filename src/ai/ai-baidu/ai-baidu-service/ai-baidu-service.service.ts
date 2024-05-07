import { Injectable } from '@nestjs/common';
import { CreateAiBaiduServiceDto } from './dto/create-ai-baidu-service.dto';
import { UpdateAiBaiduServiceDto } from './dto/update-ai-baidu-service.dto';

@Injectable()
export class AiBaiduServiceService {
  create(createAiBaiduServiceDto: CreateAiBaiduServiceDto) {
    return 'This action adds a new aiBaiduService';
  }

  findAll() {
    return `This action returns all aiBaiduService`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aiBaiduService`;
  }

  update(id: number, updateAiBaiduServiceDto: UpdateAiBaiduServiceDto) {
    return `This action updates a #${id} aiBaiduService`;
  }

  remove(id: number) {
    return `This action removes a #${id} aiBaiduService`;
  }
}
