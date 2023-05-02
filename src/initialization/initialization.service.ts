import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { CreateSuperAdminDto } from './dtos/create-cuper-admin.dto';

@Injectable()
export class InitializationService {
  constructor(private readonly userService: UsersService) {}

  async createSuperAdmin(user: CreateSuperAdminDto): Promise<void> {
    const superAdmin: User = await this.userService.findSuperAdmin();
    if (superAdmin === null) {
      await this.userService.create({
        username: user.username,
        password: user.password,
        isSuper: true,
        nickname: '超级管理员'
      });
    } else {
      throw new HttpException({
        message: '超级管理员已存在，无法再次添加',
        code: 10001 
      }, HttpStatus.BAD_REQUEST);
    }

    return;
  }
}
