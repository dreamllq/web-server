import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions } from 'src/types';
import { Like, Repository } from 'typeorm';
import { Weixin } from './weixin.entity';
import { WeixinAppTypeEnum } from './weixin.type';

interface CreateData{
  name: string,
  appid: string,
  appSecret: string,
  appType: WeixinAppTypeEnum
}

interface updateData{
  appSecret: string,
  appType: WeixinAppTypeEnum
}

@Injectable()
export class WeixinService {
  constructor(
    @InjectRepository(Weixin)
    private weixinRepository: Repository<Weixin>
  ) {}

  find(appType: WeixinAppTypeEnum) {
    return this.weixinRepository.find({ where: { appType: appType ?? undefined } });
  }

  findOne(id:string) {
    return this.weixinRepository.findOne({ where: { id } });
  }

  create(data: CreateData) {
    return this.weixinRepository.insert(data);
  }

  remove(id:string) {
    return this.weixinRepository.delete(id);
  }

  update(id:string, data:updateData) {
    return this.weixinRepository.update(id, data);
  }

  async paginate(options: IPaginationOptions, { name = '' }: { name: string }) {
    const [list, count] = await this.weixinRepository.findAndCount({
      where: { name: Like(`%${name}%`) },
      order: { createDate: 'DESC' },
      skip: (options.pageNo - 1) * options.pageSize,
      take: options.pageSize
    });
    return {
      list,
      count 
    };
  }

  findByAppid(appid) {
    return this.weixinRepository.findOne({ where: { appid: appid } });
  }
}
