import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, IPaginationResult } from 'src/types';
import { FindOptionsRelations, Like, Repository } from 'typeorm';
import { Password } from './password.entity';
import { User } from './user.entity';
import { RolesService } from 'src/roles/roles.service';
import { AddressService } from 'src/address/address.service';
import { SmsService } from 'src/sms/sms.service';
import { SmsTypeEnum } from 'src/sms/types';
import { WeixinMiniProgramService } from 'src/weixin-platform/weixin-mini-program/weixin-mini-program.service';
import { WeixinPlatformUserService } from 'src/weixin-platform/weixin-platform-user/weixin-platform-user.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Password)
    private passwordRepository: Repository<Password>,
    private readonly rolesService: RolesService,
    private readonly weixinPlatformUserService: WeixinPlatformUserService,
    private readonly addressService: AddressService,
    private readonly smsService: SmsService,
    private readonly weixinMiniProgramService: WeixinMiniProgramService
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: { roles: true } });
  }

  findOne(id, options: {relations?: FindOptionsRelations<User>} = { relations: { roles: { resources: true } } }): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
      relations: options.relations
    });
  }

  async remove(id) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        addresses: true,
        weixinPlatformUsers: true,
        password: true
      }
    });
    const addressIds = user.addresses.map(item => item.id);
    if (addressIds.length > 0) {
      await this.addressService.remove(addressIds);
    }
    
    const weixinPlatformUserIds = user.weixinPlatformUsers.map(item => item.id);
    if (weixinPlatformUserIds.length > 0) {
      await this.weixinPlatformUserService.remove(weixinPlatformUserIds);
    }

    await this.usersRepository.delete({
      id: id,
      isSuper: false 
    });
    if (user.password) {
      await this.passwordRepository.delete(user.password.id);
    }
  }

  async create(userOption) {
    const roles = await this.rolesService.findByIds(userOption.roleIds);
    const password = new Password();
    password.password = userOption.password ?? null;
    this.passwordRepository.save(password);

    const user = new User();
    user.username = userOption.username ?? null;
    user.nickName = userOption.nickName ?? null;
    user.password = password;
    user.isSuper = userOption.isSuper === true;
    user.roles = roles;
    user.mobile = userOption.mobile ?? null;
    user.headimg = userOption.headimg;
    return this.usersRepository.save(user);
  }

  async update(id, userOption) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: { roles: true } 
    });
    const roles = await this.rolesService.findByIds(userOption.roleIds);
    user.roles = roles;
    user.mobile = userOption.mobile ?? null;
    user.username = userOption.username ?? null;
    user.nickName = userOption.nickName ?? null;
    user.headimg = userOption.headimg;
    return this.usersRepository.save(user);
  }

  findUserByName(username: string, relations?:FindOptionsRelations<User>): Promise<User | undefined> {
    return this.usersRepository.findOne({ 
      where: { username },
      relations: relations
    });
  }

  findSuperAdmin(): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ isSuper: true });
  }

  async paginate(options: IPaginationOptions, filter: {username?: string}): Promise<IPaginationResult<User>> {
    const [list, count] = await this.usersRepository.findAndCount({
      where: { username: filter.username === '' ? undefined : Like(`%${ filter.username }%`) },
      order: { createDate: 'DESC' },
      skip: (options.pageNo - 1) * options.pageSize,
      take: options.pageSize,
      relations: { roles: true }
    });
    return {
      list,
      count 
    };
  }

  async getAndCreateByMobile(mobile) {
    const user = await this.usersRepository.findOneBy({ mobile });
    if (user !== null) {
      return user;
    } else {
      const newUser = new User();
      newUser.mobile = mobile;
      newUser.nickName = '手机用户';
      return await this.usersRepository.save(newUser);
    }
  }

  async getUserWithAppidAndCodeOfWeixin(appid, code) {
    const weixinPlatformUser = await this.weixinPlatformUserService.getByAppidAndCode(appid, code);
    if (!weixinPlatformUser.user) {
      const user = await this.usersRepository.save(new User());
      await this.weixinPlatformUserService.bindUser(weixinPlatformUser, user);
      return user;
    }
    return weixinPlatformUser.user;
  }

  async bindWeixin(id, appid, code) {
    const user = await this.usersRepository.findOneBy({ id });
    const weixinPlatformUser = await this.weixinPlatformUserService.getByAppidAndCode(appid, code);
    await this.weixinPlatformUserService.bindUser(weixinPlatformUser, user);
    return;
  }

  async bindMobile(id, mobile, code) {
    const user = await this.usersRepository.findOneBy({ id });
    const pass = await this.smsService.checkValidCode(mobile, SmsTypeEnum.BindMobile, code);
    if (user && pass) {
      user.mobile = mobile;
    }

    return this.usersRepository.save(user);
  }

  async bindMpMobile(id, appid, code) {
    const user = await this.usersRepository.findOneBy({ id });
    const res = await this.weixinMiniProgramService.getPhoneNumber(appid, code);
    if (user && res && res.phoneNumber) {
      user.mobile = res.phoneNumber;
    }
    return this.usersRepository.save(user);
  }

  async bindUsername(id, username, password) {
    const user = await this.usersRepository.findOneBy({ id });
    const pw = new Password();
    pw.password = password;
    await this.passwordRepository.save(pw);
    user.username = username;
    user.password = pw;
    return this.usersRepository.save(user);
  }
}