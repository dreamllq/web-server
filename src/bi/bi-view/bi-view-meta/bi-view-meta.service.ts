import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions } from 'src/types';
import { CreateBiViewMetaDto } from './dto/create-bi-view-meta.dto';
import { UpdateBiViewMetaDto } from './dto/update-bi-view-meta.dto';
import { BiViewMeta } from './entities/bi-view-meta.entity';
import puppeteer from 'puppeteer';
import { FileService } from 'src/file/file.service';

@Injectable()
export class BiViewMetaService {
  constructor(
      @InjectRepository(BiViewMeta)
      private biViewMetaRepository: Repository<BiViewMeta>,
          private readonly fileService: FileService,
  ) {}
  findAll() {
    return this.biViewMetaRepository.find({ relations: { creator: true } });
  }
  
  create(data:CreateBiViewMetaDto & {creatorId: string}) {
    return this.biViewMetaRepository.insert({
      name: data.name,
      desc: data.desc,
      creator: { id: data.creatorId }
    });
  }
  
  remove(id:string) {
    return this.biViewMetaRepository.delete(id);
  }
  
  findOne(id: string) {
    return this.biViewMetaRepository.findOne({
      where: { id },
      relations: { creator: true }
    });
  }
  
  update(id:string, data:UpdateBiViewMetaDto) {
    return this.biViewMetaRepository.update(id, {
      name: data.name,
      desc: data.desc 
    });
  }
  
  async paginate(options: IPaginationOptions, filter: { name: string, creatorId?: string }) {
    const where: Parameters<typeof this.biViewMetaRepository.findAndCount>[0]['where'] = { name: Like(`%${filter.name}%`) };
      
    if (filter.creatorId) {
      where.creator = { id: filter.creatorId }; 
    }
    const [list, count] = await this.biViewMetaRepository.findAndCount({
      where,
      order: { createDate: 'DESC' },
      skip: (options.pageNo - 1) * options.pageSize,
      take: options.pageSize,
      relations: { creator: true }
    });
    return {
      list,
      count 
    };
  }

  async exportImage(options:{url:string, token:string}) {
    const browser = await puppeteer.launch();
    try {
      const page = await browser.newPage();
      // await page.setViewport({
      //   width: 1080,
      //   height: 1024 
      // });
      // await page.goto('http://localhost:5173/web/vite.svg');
      await page.goto(options.url);
      await page.evaluate((options) => {
        localStorage.setItem('token', options.token); // 将 'key' 设置为你想要的键名，'value' 为对应的值
      }, options);
      await page.waitForSelector('#bi-view-ready');
      const buffer = Buffer.from(await page.pdf());
      const title = await page.title();
      const fileId = await this.fileService.create({
        buffer,
        originalname: `${title}.pdf`,
        size: buffer.length 
      } as Express.Multer.File);
      await browser.close();
      return fileId;
    } catch (e) {
      await browser.close();
      throw e;
    }

  }
}
