import { Injectable } from '@nestjs/common';
import { CreateAiAliyunOcrDto } from './dto/create-ai-aliyun-ocr.dto';
import { UpdateAiAliyunOcrDto } from './dto/update-ai-aliyun-ocr.dto';

@Injectable()
export class AiAliyunOcrService {
  create(createAiAliyunOcrDto: CreateAiAliyunOcrDto) {
    return 'This action adds a new aiAliyunOcr';
  }

  findAll() {
    return `This action returns all aiAliyunOcr`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aiAliyunOcr`;
  }

  update(id: number, updateAiAliyunOcrDto: UpdateAiAliyunOcrDto) {
    return `This action updates a #${id} aiAliyunOcr`;
  }

  remove(id: number) {
    return `This action removes a #${id} aiAliyunOcr`;
  }
}
