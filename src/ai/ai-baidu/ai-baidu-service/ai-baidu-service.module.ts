import { Module } from '@nestjs/common';
import { AiBaiduServiceService } from './ai-baidu-service.service';
import { AiBaiduServiceController } from './ai-baidu-service.controller';

@Module({
  controllers: [AiBaiduServiceController],
  providers: [AiBaiduServiceService]
})
export class AiBaiduServiceModule {}
