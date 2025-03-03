import { Module } from '@nestjs/common';
import { BiDataMetaModule } from './bi-data-meta/bi-data-meta.module';
import { BiDataStructModule } from './bi-data-struct/bi-data-struct.module';
import { BiDataRuleModule } from './bi-data-rule/bi-data-rule.module';

@Module({ imports: [BiDataMetaModule, BiDataStructModule, BiDataRuleModule] })
export class BiDataModule {}
