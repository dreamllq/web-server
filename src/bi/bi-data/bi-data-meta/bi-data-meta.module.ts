import { Module } from '@nestjs/common';
import { BiDataMetaService } from './bi-data-meta.service';
import { BiDataMetaController } from './bi-data-meta.controller';

@Module({
  controllers: [BiDataMetaController],
  providers: [BiDataMetaService]
})
export class BiDataMetaModule {}
