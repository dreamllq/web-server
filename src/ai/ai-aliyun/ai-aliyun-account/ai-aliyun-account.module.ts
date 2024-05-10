import { Module } from '@nestjs/common';
import { AiAliyunAccountService } from './ai-aliyun-account.service';
import { AiAliyunAccountController } from './ai-aliyun-account.controller';
import { AiAliyunAccount } from './entities/ai-aliyun-account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AiAliyunAccount])],
  controllers: [AiAliyunAccountController],
  providers: [AiAliyunAccountService]
})
export class AiAliyunAccountModule {}
