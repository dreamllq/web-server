import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Password } from './password.entity';
import { RolesModule } from 'src/roles/roles.module';
import { AddressModule } from 'src/address/address.module';
import { SmsModule } from 'src/sms/sms.module';
import { WeixinMiniProgramModule } from 'src/weixin-platform/weixin-mini-program/weixin-mini-program.module';
import { WeixinPlatformUserModule } from 'src/weixin-platform/weixin-platform-user/weixin-platform-user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Password]),
    RolesModule,
    WeixinPlatformUserModule,
    AddressModule,
    SmsModule,
    WeixinMiniProgramModule
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}