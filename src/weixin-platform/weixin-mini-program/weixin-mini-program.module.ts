import { Module } from '@nestjs/common';
import { WeixinMiniProgramController } from './weixin-mini-program.controller';
import { WeixinMiniProgramService } from './weixin-mini-program.service';
import { WeixinModule } from 'src/weixin/weixin.module';
import { CustomCacheModule } from 'src/custom-cache/custom-cache.module';

@Module({
  imports: [WeixinModule, CustomCacheModule],
  controllers: [WeixinMiniProgramController],
  providers: [WeixinMiniProgramService],
  exports: [WeixinMiniProgramService]
})
export class WeixinMiniProgramModule {}
