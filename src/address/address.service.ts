import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './address.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  create(userId:string, data: {name: string, mobile: string, country: number, province: number, city: number, region: number, address: string, isDefault: boolean}) {
    return this.addressRepository.insert({
      name: data.name,
      mobile: data.mobile,
      country: data.country,
      province: { id: data.province },
      city: { id: data.city },
      region: { id: data.region },
      address: data.address,
      isDefault: data.isDefault,
      user: { id: userId }
    }); 
  }

  findOne(id:string) {
    return this.addressRepository.findOne({
      where: { id },
      relations: {
        province: true,
        city: true,
        region: true 
      }
    });
  }

  findWithUserId(userId) {
    return this.addressRepository.find({
      where: { user: { id: userId } },
      relations: {
        province: true,
        city: true,
        region: true 
      }
    });
  }

  remove(data) {
    return this.addressRepository.delete(data);
  }

  removeWithUserId(userId, id) {
    return this.addressRepository.delete({
      id: id,
      user: { id: userId }
    });
  }

  updateWithUserId(userId, id, data) {
    return this.addressRepository.update({
      id,
      user: { id: userId }
    }, data);
  }

}
