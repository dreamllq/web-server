import { Module } from '@nestjs/common';
import { BiDataRuleService } from './bi-data-rule.service';
import { BiDataRuleController } from './bi-data-rule.controller';

@Module({
  controllers: [BiDataRuleController],
  providers: [BiDataRuleService]
})
export class BiDataRuleModule {}
