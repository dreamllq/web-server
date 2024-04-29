import { Module } from '@nestjs/common';
import { AiBaiduAccountService } from './ai-baidu-account.service';
import { AiBaiduAccountController } from './ai-baidu-account.controller';

@Module({
  controllers: [AiBaiduAccountController],
  providers: [AiBaiduAccountService]
})
export class AiBaiduAccountModule {}
