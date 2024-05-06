import { Module } from '@nestjs/common';
import { AiBaiduAccountService } from './ai-baidu-account.service';
import { AiBaiduAccountController } from './ai-baidu-account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiBaiduAccount } from './entities/ai-baidu-account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AiBaiduAccount])],
  controllers: [AiBaiduAccountController],
  providers: [AiBaiduAccountService]
})
export class AiBaiduAccountModule {}
