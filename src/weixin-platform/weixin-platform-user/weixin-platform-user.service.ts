import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WeixinPlatformUser } from './weixin-platform-user.entity';
import { Repository } from 'typeorm';
import { WeixinService } from 'src/weixin/weixin.service';
import { WeixinAppTypeEnum } from 'src/weixin/weixin.type';
import { WeixinOfficialAccountOauthService } from 'src/weixin-platform/weixin-official-account-oauth/weixin-official-account-oauth.service';
import { WeixinMiniProgramService } from 'src/weixin-platform/weixin-mini-program/weixin-mini-program.service';
import { WeixinPlatformUserPaginateDto } from './dtos/paginate.dto';

@Injectable()
export class WeixinPlatformUserService {
  constructor(
    @InjectRepository(WeixinPlatformUser)
    private weixinPlatformUserRepository: Repository<WeixinPlatformUser>,
    private readonly weixinService: WeixinService,
    private readonly weixinOfficialAccountOauthService: WeixinOfficialAccountOauthService,
    private readonly weixinMiniProgramService: WeixinMiniProgramService
  ) {}

  remove(data) {
    return this.weixinPlatformUserRepository.delete(data);
  }

  findByOpenid(openid) {
    return this.weixinPlatformUserRepository.findOne({
      where: { openid },
      relations: { user: true }
    });
  }

  async getUserByUnionid(unionid) {
    const weixinPlatformUser = await this.weixinPlatformUserRepository.findOne({
      where: { unionid },
      relations: { user: true }
    });
    if (weixinPlatformUser === null) {
      return null;
    } else {
      return weixinPlatformUser.user;
    }
  }

  async getByAppidAndCode(appid, code) {
    const weixin = await this.weixinService.findByAppid(appid);
    let openid;
    let unionid;
    let weixinPlatformUser;
    if (weixin.appType === WeixinAppTypeEnum.OFFICIAL_ACCOUNT) {
      const data = await this.weixinOfficialAccountOauthService.getOpenidAndUnionidByCode(appid, code);
      openid = data.openid;
      unionid = data.unionid;
    } else if (weixin.appType === WeixinAppTypeEnum.MP) {
      const data = await this.weixinMiniProgramService.code2Session(appid, code);
      openid = data.openid;
      unionid = data.unionid;
    } else {
      throw new HttpException({
        message: `appType:${weixin.appType} 未支持`,
        code: 120001
      }, HttpStatus.BAD_REQUEST);
    }

    weixinPlatformUser = await this.findByOpenid(openid);

    if (weixinPlatformUser === null) {
      weixinPlatformUser = new WeixinPlatformUser();
      weixinPlatformUser.openid = openid;
    }

    weixinPlatformUser.unionid = unionid;
    weixinPlatformUser.weixin = weixin;

    const user = await this.getUserByUnionid(unionid);

    if (user !== null) {
      weixinPlatformUser.user = user;
    }

    return this.weixinPlatformUserRepository.save(weixinPlatformUser);
  }

  async bindUser(weixinPlatformUser, user) {
    weixinPlatformUser.user = user;
    return this.weixinPlatformUserRepository.save(weixinPlatformUser);
  }

  async paginate(dto: WeixinPlatformUserPaginateDto) {
    const { pageNo, pageSize, ...filter } = dto;
    const [list, count] = await this.weixinPlatformUserRepository.findAndCount({
      where: { weixin: { id: filter.weixinId } },
      order: { createDate: 'DESC' },
      skip: (pageNo - 1) * pageSize,
      take: pageSize,
      relations: { weixin: true }
    });
    return {
      list,
      count 
    };
  }
}
