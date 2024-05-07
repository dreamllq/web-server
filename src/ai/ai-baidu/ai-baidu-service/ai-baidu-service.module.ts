import { Module } from '@nestjs/common';
import { AiBaiduServiceService } from './ai-baidu-service.service';
import { AiBaiduServiceController } from './ai-baidu-service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiBaiduService } from './entities/ai-baidu-service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AiBaiduService])],
  controllers: [AiBaiduServiceController],
  providers: [AiBaiduServiceService]
})
export class AiBaiduServiceModule {}
