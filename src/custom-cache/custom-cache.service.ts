import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CustomCacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}


  async set(key, value, ttl?: number) {
    return this.cacheManager.set(key, value, { ttl: ttl } as any);
  }

  async get(key): Promise<string> {
    return this.cacheManager.get(key);
  }

  async del(key) {
    return this.cacheManager.del(key);
  }
}
