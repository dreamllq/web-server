import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { ResourcesModule } from 'src/resources/resources.module';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), ResourcesModule],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService]
})
export class RolesModule {}
