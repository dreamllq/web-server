import { Injectable } from '@nestjs/common';
import { CreateAiBaiduSessionDto } from './dto/create-ai-baidu-session.dto';
import { UpdateAiBaiduSessionDto } from './dto/update-ai-baidu-session.dto';

@Injectable()
export class AiBaiduSessionService {
  create(createAiBaiduSessionDto: CreateAiBaiduSessionDto) {
    return 'This action adds a new aiBaiduSession';
  }

  findAll() {
    return `This action returns all aiBaiduSession`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aiBaiduSession`;
  }

  update(id: number, updateAiBaiduSessionDto: UpdateAiBaiduSessionDto) {
    return `This action updates a #${id} aiBaiduSession`;
  }

  remove(id: number) {
    return `This action removes a #${id} aiBaiduSession`;
  }
}
