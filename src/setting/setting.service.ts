import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting } from './setting.entity';

interface StoreItem {
  key:string,
  value:string
}

@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(Setting)
    private settingRepository: Repository<Setting>,
  ) {}

  async get(key:string) {
    return this.settingRepository.findOneBy({ key });
  }

  async set(key:string, value:string) {
    const item = await this.get(key);
    if (item === null) {
      return this.settingRepository.insert({
        key,
        value 
      });
    } else {
      return this.settingRepository.update(item.id, { value });
    }
  }

  async getItems(keys: string[]) {
    const promiseArr = keys.map(key => this.get(key));
    return Promise.all(promiseArr);
  }

  async setItems(data: StoreItem[]) {
    const promiseArr = data.map(item => this.set(item.key, item.value));
    return Promise.all(promiseArr);
  }
}
