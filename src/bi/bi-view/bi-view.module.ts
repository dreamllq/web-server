import { Module } from '@nestjs/common';
import { BiViewMetaModule } from './bi-view-meta/bi-view-meta.module';

@Module({
  imports: [BiViewMetaModule]
})
export class BiViewModule {}
