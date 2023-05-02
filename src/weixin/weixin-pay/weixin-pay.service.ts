import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WeixinPay } from './weixin-pay.entity';
import { Repository } from 'typeorm';
import { IPaginationOptions } from 'src/types';

@Injectable()
export class WeixinPayService {
  
  constructor(
    @InjectRepository(WeixinPay)
    private weixinPayRepository: Repository<WeixinPay>,
  ) {}

  create(data:{name: string, mchid: string, partnerKey:string, pfx: string, notifyUrl: string, spbillCreateIp:string }) {
    return this.weixinPayRepository.insert({
      name: data.name,
      mchid: data.mchid,
      partnerKey: data.partnerKey,
      pfx: data.pfx,
      notifyUrl: data.notifyUrl,
      spbillCreateIp: data.spbillCreateIp
    });
  }

  remove(id:string) {
    return this.weixinPayRepository.delete(id);
  }

  update(id:string, data:{name: string, mchid: string, partnerKey:string, pfx?: string, notifyUrl: string, spbillCreateIp:string }) {
    return this.weixinPayRepository.update(id, {
      name: data.name,
      mchid: data.mchid,
      partnerKey: data.partnerKey,
      pfx: data.pfx,
      notifyUrl: data.notifyUrl,
      spbillCreateIp: data.spbillCreateIp
    });
  }

  findOne(id:string) {
    return this.weixinPayRepository.findOneBy({ id });
  }

  findOneByMchid(mchid:string) {
    return this.weixinPayRepository.findOneBy({ mchid });
  }

  findAll() {
    return this.weixinPayRepository.find({ order: { createDate: 'DESC' } });
  }

  async paginate(options: IPaginationOptions) {
    const [list, count] = await this.weixinPayRepository.findAndCount({
      order: { createDate: 'DESC' },
      skip: (options.pageNo - 1) * options.pageSize,
      take: options.pageSize
    });
    return {
      list,
      count 
    };
  }
}
