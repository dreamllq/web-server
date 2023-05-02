import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SmsService } from 'src/sms/sms.service';
import { CustomCacheService } from 'src/custom-cache/custom-cache.service';
import { v4 as uuidv4 } from 'uuid';
import { SmsTypeEnum } from 'src/sms/types';
import { WeixinMiniProgramService } from 'src/weixin-platform/weixin-mini-program/weixin-mini-program.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService, 
    private readonly jwtService: JwtService,
    private readonly smsService: SmsService,
    private readonly cacheService: CustomCacheService,
    private readonly weixinMiniProgramService: WeixinMiniProgramService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserByName(username, { password: true });
    if (user && user.password.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  verify(token) {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      throw new HttpException({}, HttpStatus.UNAUTHORIZED);
    }
  }

  cancellation(id) {
    return this.usersService.remove(id);
  }

  async login(user: any) {
    const payload = { sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async loginBySmsCode(mobile, code) {
    const check = await this.smsService.checkValidCode(mobile, SmsTypeEnum.Login, code);
    if (check === false) {
      throw new HttpException({
        message: '登录失败',
        code: 11002
      }, HttpStatus.BAD_REQUEST);
    }

    const user = await this.usersService.getAndCreateByMobile(mobile);
    return { access_token: this.jwtService.sign({ sub: user.id }) };
  }

  async generateAuthCode(userId: string): Promise<string> {
    const code = uuidv4();
    await this.cacheService.set(`auth:${code}`, userId, 5 * 60);
    return code;
  }

  async getAndCheckAuthCode(code) {
    const userId = await this.cacheService.get(`auth:${code}`);
    await this.cacheService.del(`auth:${code}`);
    return userId;
  } 

  async loginByCode(code) {
    const userId = await this.getAndCheckAuthCode(code);
    if (!userId) {
      throw new HttpException({
        message: '登录失败',
        code: 11003
      }, HttpStatus.BAD_REQUEST);
    }
    const user = await this.usersService.findOne(userId);

    return { access_token: this.jwtService.sign({ sub: user.id }) };
  }

  async loginByWeixin(data) {
    const user = await this.usersService.getUserWithAppidAndCodeOfWeixin(data.appid, data.code);
    return { access_token: this.jwtService.sign({ sub: user.id }) };
  }

  async loginByWeixinMobile(data) {
    const res = await this.weixinMiniProgramService.getPhoneNumber(data.appid, data.code);
    const user = await this.usersService.getAndCreateByMobile(res.phoneNumber);
    return { access_token: this.jwtService.sign({ sub: user.id }) };
  }
}
