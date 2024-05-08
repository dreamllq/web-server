import { Module } from '@nestjs/common';
import { AiBaiduMessageService } from './ai-baidu-message.service';
import { AiBaiduMessageController } from './ai-baidu-message.controller';
import { AiBaiduMessage } from './entities/ai-baidu-message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AiBaiduMessage])],
  controllers: [AiBaiduMessageController],
  providers: [AiBaiduMessageService]
})
export class AiBaiduMessageModule {}
