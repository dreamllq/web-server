import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const FileStore = require('session-file-store')(session);
import { HttpExceptionFilter } from './filters/http-exception.filter';
// import { TransformInterceptor } from './interceptors/transform.interceptor';
import { ValidationPipe } from './pipes/validate.pipe';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // console.log(`redis://${process.env.LWS_REDIS_HOST}:${process.env.LWS_REDIS_PORT}`);
  const redisClient = createClient({ url: `redis://${process.env.LWS_REDIS_HOST}:${process.env.LWS_REDIS_PORT}` });
  redisClient.connect().catch(console.error);
  const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'session:',
    ttl: 60 * 60 * 2
  });
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      store: redisStore
    }),
  );
  app.setGlobalPrefix('/api'); 
  // 全局注册错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 全局注册拦截器
  // app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('server')
    .setDescription('The server API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
