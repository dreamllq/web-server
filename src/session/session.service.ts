import { Injectable } from '@nestjs/common';
import { ResourcesService } from 'src/resources/resources.service';
import { UsersService } from 'src/users/users.service';
import { uniq } from 'lodash';

@Injectable()
export class SessionService {
  constructor(
    private readonly usersService:UsersService, 
    private readonly resourcesService: ResourcesService
  ) {}

  async getLoginUser(loginUserId) {
    const user = await this.usersService.findOne(loginUserId, { relations: { weixinPlatformUsers: { weixin: true } } });
    return user;
  }

  async getResources(loginUserId): Promise<string[]> {
    const user = await this.usersService.findOne(loginUserId);

    if (user.isSuper === true) {
      const resources = await this.resourcesService.findAll();
      return resources.map(resource => resource.key);
    } else {
      const resourceKeys = [];
      user.roles.forEach(role => {
        role.resources.forEach(resource => {
          resourceKeys.push(resource.key);
        });
      });

      return uniq(resourceKeys);
    }
  }
}
