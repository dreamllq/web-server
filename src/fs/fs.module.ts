import { Module } from '@nestjs/common';
import { FsService } from './fs.service';
import { FsController } from './fs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { F } from './entities/f.entity';
import { FileDetail } from './entities/file-detail.entity';
import { FsStaticController } from './static/static.controller';
import { FileModule } from 'src/file/file.module';
import { FileService } from 'src/file/file.service';

@Module({
  imports: [TypeOrmModule.forFeature([F, FileDetail]), FileModule],
  controllers: [FsController, FsStaticController],
  providers: [FsService]
})
export class FsModule {}
