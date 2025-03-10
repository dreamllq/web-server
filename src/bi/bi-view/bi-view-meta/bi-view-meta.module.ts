import { Module } from '@nestjs/common';
import { BiViewMetaService } from './bi-view-meta.service';
import { BiViewMetaController } from './bi-view-meta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BiViewMeta } from './entities/bi-view-meta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BiViewMeta])],
  controllers: [BiViewMetaController],
  providers: [BiViewMetaService]
})
export class BiViewMetaModule {}
