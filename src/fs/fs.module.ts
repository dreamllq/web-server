import { Module } from '@nestjs/common';
import { FsService } from './fs.service';
import { FsController } from './fs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { F } from './entities/f.entity';
import { FileDetail } from './entities/file-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([F, FileDetail])],
  controllers: [FsController],
  providers: [FsService]
})
export class FsModule {}
