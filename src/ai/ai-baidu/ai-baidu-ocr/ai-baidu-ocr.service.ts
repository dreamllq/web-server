import { Injectable } from '@nestjs/common';
import { CreateAiBaiduOcrDto } from './dto/create-ai-baidu-ocr.dto';
import { UpdateAiBaiduOcrDto } from './dto/update-ai-baidu-ocr.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AiBaiduOcr } from './entities/ai-baidu-ocr.entity';
import { Repository } from 'typeorm';
import { AiBaiduOrcGeneralScenarios } from './entities/ai-baidu-orc-general-scenarios.entity';
import { OcrOperates } from './constants/ocr-operate';
import { IPaginationOptions } from 'src/types';

@Injectable()
export class AiBaiduOcrService {
  constructor(
    @InjectRepository(AiBaiduOcr)
    private aiBaiduOcrRepository: Repository<AiBaiduOcr>,
    @InjectRepository(AiBaiduOrcGeneralScenarios)
    private aiBaiduOrcGeneralScenariosRepository: Repository<AiBaiduOrcGeneralScenarios>,
  ) {}

  async create(createAiBaiduOcrDto: CreateAiBaiduOcrDto, options:{creator:string}) {
    const ocr: Parameters<typeof this.aiBaiduOcrRepository.insert>[0] = {
      type: createAiBaiduOcrDto.type,
      name: createAiBaiduOcrDto.name,
      account: { id: createAiBaiduOcrDto.accountId },
      creator: { id: options.creator }
    };

    if (ocr.type === OcrOperates.GeneralScenarios) {
      const generalScenarios = await this.aiBaiduOrcGeneralScenariosRepository.insert({
        file: { id: createAiBaiduOcrDto.generalScenarios.fileId },
        type: createAiBaiduOcrDto.generalScenarios.type,
        fileNumber: +createAiBaiduOcrDto.generalScenarios.fileNumber
      });
      ocr.generalScenarios = { id: generalScenarios.identifiers[0].id };
    }

    return this.aiBaiduOcrRepository.insert(ocr);
  }

  findAll() {
    return this.aiBaiduOcrRepository.find({
      relations: {
        creator: true,
        account: true,
        generalScenarios: { file: true }
      } 
    });
  }

  findOne(id: string, options?:{relationFileBuffer?: boolean}) {
    return this.aiBaiduOcrRepository.findOne({
      where: { id },
      relations: {
        creator: true,
        account: true,
        generalScenarios: { file: options?.relationFileBuffer ? { content: true } : true }  
      } 
    });
  }



  async paginate(options: IPaginationOptions) {
    const [list, count] = await this.aiBaiduOcrRepository.findAndCount({
      order: { createDate: 'DESC' },
      skip: (options.pageNo - 1) * options.pageSize,
      take: options.pageSize,
      relations: {
        creator: true,
        account: true,
        generalScenarios: { file: true }
      }
    });
    return {
      list,
      count 
    };
  }

  async saveResult(id:string, result: string) {
    const ocr = await this.findOne(id);
    if (ocr.type === OcrOperates.GeneralScenarios) {
      await this.aiBaiduOrcGeneralScenariosRepository.update(ocr.generalScenarios.id, { result });
    }
  }

  update(id: string, updateAiBaiduOcrDto: UpdateAiBaiduOcrDto) {
    return `This action updates a #${id} aiBaiduOcr`;
  }

  remove(id: string) {
    return `This action removes a #${id} aiBaiduOcr`;
  }
}
