import { Module } from '@nestjs/common';
import { ResourcesModule } from 'src/resources/resources.module';
import { UsersModule } from 'src/users/users.module';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';

@Module({
  imports: [UsersModule, ResourcesModule],
  controllers: [SessionController],
  providers: [SessionService]
})
export class SessionModule {}
