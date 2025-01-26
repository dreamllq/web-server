import { Module } from '@nestjs/common';
import { BiViewMetaService } from './bi-view-meta.service';
import { BiViewMetaController } from './bi-view-meta.controller';

@Module({
  controllers: [BiViewMetaController],
  providers: [BiViewMetaService]
})
export class BiViewMetaModule {}
