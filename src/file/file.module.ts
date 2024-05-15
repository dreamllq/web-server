import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { File } from './file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaticController } from './static/static.controller';
import { FileBuffer } from './file-buffer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([File, FileBuffer])],
  controllers: [FileController, StaticController],
  providers: [FileService],
  exports: [FileService]
})
export class FileModule {}
