import { Module } from '@nestjs/common';
import { WeixinPayCenterController } from './weixin-pay-center.controller';
import { WeixinPayCenterService } from './weixin-pay-center.service';
import { WeixinModule } from 'src/weixin/weixin.module';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [WeixinModule, FileModule],
  controllers: [WeixinPayCenterController],
  providers: [WeixinPayCenterService]
})
export class WeixinPayCenterModule {}
