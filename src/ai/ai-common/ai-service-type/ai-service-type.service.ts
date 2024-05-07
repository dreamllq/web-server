import { Injectable } from '@nestjs/common';
import { CreateAiServiceTypeDto } from './dto/create-ai-service-type.dto';
import { UpdateAiServiceTypeDto } from './dto/update-ai-service-type.dto';

@Injectable()
export class AiServiceTypeService {
  create(createAiServiceTypeDto: CreateAiServiceTypeDto) {
    return 'This action adds a new aiServiceType';
  }

  findAll() {
    return `This action returns all aiServiceType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aiServiceType`;
  }

  update(id: number, updateAiServiceTypeDto: UpdateAiServiceTypeDto) {
    return `This action updates a #${id} aiServiceType`;
  }

  remove(id: number) {
    return `This action removes a #${id} aiServiceType`;
  }
}
