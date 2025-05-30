import { Module } from '@nestjs/common';
import { BiViewMetaService } from './bi-view-meta.service';
import { BiViewMetaController } from './bi-view-meta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BiViewMeta } from './entities/bi-view-meta.entity';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [TypeOrmModule.forFeature([BiViewMeta]), FileModule],
  controllers: [BiViewMetaController],
  providers: [BiViewMetaService]
})
export class BiViewMetaModule {}
