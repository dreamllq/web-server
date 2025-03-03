import { Module } from '@nestjs/common';
import { BiDataMetaModule } from './bi-data-meta/bi-data-meta.module';
import { BiDataStructModule } from './bi-data-struct/bi-data-struct.module';

@Module({ imports: [BiDataMetaModule, BiDataStructModule] })
export class BiDataModule {}
