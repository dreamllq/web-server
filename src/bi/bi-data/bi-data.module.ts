import { Module } from '@nestjs/common';
import { BiDataMetaModule } from './bi-data-meta/bi-data-meta.module';
import { BiDataStructModule } from './bi-data-struct/bi-data-struct.module';
import { BiDataRuleModule } from './bi-data-rule/bi-data-rule.module';
import { BiDataViewModule } from './bi-data-view/bi-data-view.module';

@Module({
  imports: [
    BiDataMetaModule,
    BiDataStructModule,
    BiDataRuleModule,
    BiDataViewModule
  ] 
})
export class BiDataModule {}
