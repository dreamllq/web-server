import { Module } from '@nestjs/common';
import { BiDataViewService } from './bi-data-view.service';
import { BiDataViewController } from './bi-data-view.controller';
import { BiDataMetaModule } from '../bi-data-meta/bi-data-meta.module';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [BiDataMetaModule, FileModule],
  controllers: [BiDataViewController],
  providers: [BiDataViewService]
})
export class BiDataViewModule {}
