import { Injectable } from '@nestjs/common';
import { CreateAiAliyunOcrDto } from './dto/create-ai-aliyun-ocr.dto';
import { UpdateAiAliyunOcrDto } from './dto/update-ai-aliyun-ocr.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AiAliyunOcr } from './entities/ai-aliyun-ocr.entity';
import { Repository } from 'typeorm';
import { AiAliyunOcrRecognizeAllText } from './entities/ai-aliyun-ocr-recognize-all-text.entity';
import { OcrOperates } from './constants/ocr-operate';
import { IPaginationOptions } from 'src/types';

@Injectable()
export class AiAliyunOcrService {
  constructor(
    @InjectRepository(AiAliyunOcr)
    private aiAliyunOcrRepository: Repository<AiAliyunOcr>,
    @InjectRepository(AiAliyunOcrRecognizeAllText)
    private aiAliyunOcrRecognizeAllTextRepository: Repository<AiAliyunOcrRecognizeAllText>,
  ) {}

  async create(createAiAliyunOcrDto: CreateAiAliyunOcrDto, options:{creator:string}) {
    const ocr: Parameters<typeof this.aiAliyunOcrRepository.insert>[0] = {
      type: createAiAliyunOcrDto.type,
      name: createAiAliyunOcrDto.name,
      account: { id: createAiAliyunOcrDto.accountId },
      creator: { id: options.creator } 
    };

    if (ocr.type === OcrOperates.RecognizeAllText) {
      const recognizeAllText = await this.aiAliyunOcrRecognizeAllTextRepository.insert({
        file: { id: createAiAliyunOcrDto.recognizeAllText.fileId },
        type: createAiAliyunOcrDto.recognizeAllText.type
      });
      ocr.recognizeAllText = { id: recognizeAllText.identifiers[0].id };
    }

    return this.aiAliyunOcrRepository.insert(ocr);
  }

  findAll() {
    return this.aiAliyunOcrRepository.find({
      relations: {
        creator: true,
        account: true,
        recognizeAllText: { file: true }  
      } 
    });
  }

  findOne(id: string, options?:{relationFileBuffer?: boolean}) {
    return this.aiAliyunOcrRepository.findOne({
      where: { id },
      relations: {
        creator: true,
        account: true,
        recognizeAllText: { file: options?.relationFileBuffer ? { content: true } : true }  
      } 
    });
  }

  async paginate(options: IPaginationOptions) {
    const [list, count] = await this.aiAliyunOcrRepository.findAndCount({
      order: { createDate: 'DESC' },
      skip: (options.pageNo - 1) * options.pageSize,
      take: options.pageSize,
      relations: {
        creator: true,
        account: true,
        recognizeAllText: { file: true }
      }
    });
    return {
      list,
      count 
    };
  }

  async saveResult(id:string, result: string) {
    const ocr = await this.findOne(id);
    if (ocr.type === OcrOperates.RecognizeAllText) {
      await this.aiAliyunOcrRecognizeAllTextRepository.update(ocr.recognizeAllText.id, { result });
    }
  }
}
