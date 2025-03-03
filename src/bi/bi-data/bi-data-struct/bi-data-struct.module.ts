import { Module } from '@nestjs/common';
import { BiDataStructService } from './bi-data-struct.service';
import { BiDataStructController } from './bi-data-struct.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BiDataStruct } from './entities/bi-data-struct.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BiDataStruct])],
  controllers: [BiDataStructController],
  providers: [BiDataStructService]
})
export class BiDataStructModule {}
