import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeixinOfficialAccountConfig } from './weixin-official-account-config.entity';

interface updateData {
    token: string;
    encodingAesKey: string;
    checkSignature: boolean;
}

@Injectable()
export class WeixinOfficialAccountConfigService {

  constructor(
    @InjectRepository(WeixinOfficialAccountConfig)
    private weixinOfficialAccountConfigRepository: Repository<WeixinOfficialAccountConfig>
  ) {}

  async getAndCreateByWeixin(weixinId) {
    const res = await this.weixinOfficialAccountConfigRepository.findOne({ where: { weixin: { id: weixinId } } });
    if (res === null) {
      const config = new WeixinOfficialAccountConfig();
      await this.weixinOfficialAccountConfigRepository.insert({ weixin: { id: weixinId } });
      return config;
    } else {
      return res;
    }
  }

  update(id: string, data: updateData) {
    return this.weixinOfficialAccountConfigRepository.update(id, data);
  }

  getByWeixinId(id) {
    return this.weixinOfficialAccountConfigRepository.findOne({ where: { weixin: { id: id } } });  
  }
}
