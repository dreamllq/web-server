import { Injectable } from '@nestjs/common';
import { CreateAiServiceTypeDto } from './dto/create-ai-service-type.dto';
import { UpdateAiServiceTypeDto } from './dto/update-ai-service-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AiServiceType } from './entities/ai-service-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AiServiceTypeService {
  constructor(
    @InjectRepository(AiServiceType)
    private aiServiceTypeRepository: Repository<AiServiceType>,
  ) {}
  
  create(createAiServiceTypeDto: CreateAiServiceTypeDto) {
    return this.aiServiceTypeRepository.insert({ name: createAiServiceTypeDto.name });
  }

  findAll() {
    return this.aiServiceTypeRepository.find();
  }

  findOne(id: string) {
    return this.aiServiceTypeRepository.findOne({ where: { id } });
  }

  update(id: string, updateAiServiceTypeDto: UpdateAiServiceTypeDto) {
    return this.aiServiceTypeRepository.update(id, { name: updateAiServiceTypeDto.name });
  }

  remove(id: string) {
    return this.aiServiceTypeRepository.delete(id);
  }
}
