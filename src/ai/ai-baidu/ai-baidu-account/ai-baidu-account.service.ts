import { Injectable } from '@nestjs/common';
import { CreateAiBaiduAccountDto } from './dto/create-ai-baidu-account.dto';
import { UpdateAiBaiduAccountDto } from './dto/update-ai-baidu-account.dto';

@Injectable()
export class AiBaiduAccountService {
  create(createAiBaiduAccountDto: CreateAiBaiduAccountDto) {
    return 'This action adds a new aiBaiduAccount';
  }

  findAll() {
    return `This action returns all aiBaiduAccount`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aiBaiduAccount`;
  }

  update(id: number, updateAiBaiduAccountDto: UpdateAiBaiduAccountDto) {
    return `This action updates a #${id} aiBaiduAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} aiBaiduAccount`;
  }
}
