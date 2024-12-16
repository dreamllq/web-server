import { Injectable } from '@nestjs/common';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { File } from './file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileBuffer } from './file-buffer.entity';
const md5 = require('md5');

@Injectable()
export class FileService {


  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
    @InjectRepository(FileBuffer)
    private fileBufferRepository: Repository<FileBuffer>,
  ) {}

  async create(file: Express.Multer.File): Promise<string> {
    const md5str = md5(file.buffer);
    const f = await this.fileRepository.findOne({
      where: { md5: md5str },
      relations: { content: true } 
    });
    if (f) {
      const result = await this.fileRepository.insert({
        content: f.content,
        ext: f.ext,
        name: f.name,
        md5: f.md5,
        originFileName: Buffer.from(file.originalname, 'latin1').toString('utf8')
      });
      return result.identifiers[0].id;
    }

    const ext = file.originalname
      .split('.')
      .filter(Boolean) // removes empty extensions (e.g. `filename...txt`)
      .slice(1)
      .join('.');

    const filename = `${uuidv4()}`;

    const fileBufferResult = await this.fileBufferRepository.insert({ buffer: file.buffer });

    const result = await this.fileRepository.insert({
      content: { id: fileBufferResult.identifiers[0].id },
      ext: ext,
      name: filename,
      md5: md5str,
      originFileName: Buffer.from(file.originalname, 'latin1').toString('utf8')
    });

    return result.identifiers[0].id;
  }

  findOne(id:string, options?:{relations?:{content?: boolean}}) {
    return this.fileRepository.findOne({
      where: { id },
      relations: { content: !!options?.relations?.content } 
    });
  }
}
