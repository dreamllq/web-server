import { Injectable } from '@nestjs/common';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { File } from './file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
const md5 = require('md5');

@Injectable()
export class FileService {


  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  async create(file: Express.Multer.File): Promise<string> {
    const md5str = md5(file.buffer);
    const f = await this.fileRepository.findOne({ where: { md5: md5str } });
    if (f) {
      return f.id;
    }

    const ext = file.originalname
      .split('.')
      .filter(Boolean) // removes empty extensions (e.g. `filename...txt`)
      .slice(1)
      .join('.');

    const filename = `${uuidv4()}`;

    const result = await this.fileRepository.insert({
      content: file.buffer,
      ext: ext,
      name: filename,
      md5: md5str
    });

    return result.identifiers[0].id;
  }

  findOne(id) {
    return this.fileRepository.findOne({ where: { id } });
  }
}
