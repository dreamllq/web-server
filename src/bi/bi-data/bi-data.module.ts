import { Module } from '@nestjs/common';
import { BiDataMetaModule } from './bi-data-meta/bi-data-meta.module';

@Module({
  imports: [BiDataMetaModule]
})
export class BiDataModule {}
