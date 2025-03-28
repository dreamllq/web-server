import { CustomCacheService } from './custom-cache.service';
import { redisStore } from 'cache-manager-redis-store';
import { CacheModule, Module } from '@nestjs/common';

@Module({
  imports: [
    CacheModule.register({
      // @ts-ignore
      store: async () => await redisStore({
        socket: {
          host: process.env.LWS_REDIS_HOST,
          port: Number(process.env.LWS_REDIS_PORT)
        }
      })
    })
  ],
  providers: [CustomCacheService],
  exports: [CustomCacheService]
})
export class CustomCacheModule {}
