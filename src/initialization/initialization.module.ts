import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { InitializationController } from './initialization.controller';
import { InitializationService } from './initialization.service';

@Module({
  imports: [UsersModule],
  controllers: [InitializationController],
  providers: [InitializationService]
})
export class InitializationModule {}
