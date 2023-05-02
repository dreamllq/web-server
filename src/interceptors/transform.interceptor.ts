import { Injectable, NestInterceptor, CallHandler, ExecutionContext, Logger } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  private readonly logger = new Logger('TransformInterceptor');
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    this.logger.log(`[req]url: ${request.url} body:${JSON.stringify(request.body)}`);
    return next.handle().pipe(
      map((data) => {
        const returnData = {
          data,
          code: 200,
          message: '请求成功'
        };
        this.logger.log(`[res]url: ${request.url} data:${JSON.stringify(data)}`);
        return returnData;
      }),
    );
  }
}
