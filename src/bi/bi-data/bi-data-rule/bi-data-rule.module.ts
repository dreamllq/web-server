import { Module } from '@nestjs/common';
import { BiDataRuleService } from './bi-data-rule.service';
import { BiDataRuleController } from './bi-data-rule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BiDataRule } from './entities/bi-data-rule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BiDataRule])],
  controllers: [BiDataRuleController],
  providers: [BiDataRuleService]
})
export class BiDataRuleModule {}
