import { Injectable } from '@nestjs/common';
import { CreateAiAliyunAccountDto } from './dto/create-ai-aliyun-account.dto';
import { UpdateAiAliyunAccountDto } from './dto/update-ai-aliyun-account.dto';

@Injectable()
export class AiAliyunAccountService {
  create(createAiAliyunAccountDto: CreateAiAliyunAccountDto) {
    return 'This action adds a new aiAliyunAccount';
  }

  findAll() {
    return `This action returns all aiAliyunAccount`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aiAliyunAccount`;
  }

  update(id: number, updateAiAliyunAccountDto: UpdateAiAliyunAccountDto) {
    return `This action updates a #${id} aiAliyunAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} aiAliyunAccount`;
  }
}
