import { Injectable } from '@nestjs/common';
import { CreateAiBaiduMessageDto } from './dto/create-ai-baidu-message.dto';
import { UpdateAiBaiduMessageDto } from './dto/update-ai-baidu-message.dto';

@Injectable()
export class AiBaiduMessageService {
  create(createAiBaiduMessageDto: CreateAiBaiduMessageDto) {
    return 'This action adds a new aiBaiduMessage';
  }

  findAll() {
    return `This action returns all aiBaiduMessage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aiBaiduMessage`;
  }

  update(id: number, updateAiBaiduMessageDto: UpdateAiBaiduMessageDto) {
    return `This action updates a #${id} aiBaiduMessage`;
  }

  remove(id: number) {
    return `This action removes a #${id} aiBaiduMessage`;
  }
}
