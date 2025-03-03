import { Module } from '@nestjs/common';
import { BiDataMetaService } from './bi-data-meta.service';
import { BiDataMetaController } from './bi-data-meta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BiDataMeta } from './entities/bi-data-meta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BiDataMeta])],
  controllers: [BiDataMetaController],
  providers: [BiDataMetaService]
})
export class BiDataMetaModule {}
