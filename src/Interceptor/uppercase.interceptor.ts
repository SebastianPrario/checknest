import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UppercaseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    console.log(request.query);
    if (request.body) {
      this.transformToUppercase(request.body);
    }
    if (request.query) {
      this.transformToUppercase(request.query);
    }
    return next.handle().pipe(
      map((data) => {
        if (typeof data === 'object') {
          this.transformToUppercase(data);
        }
        return data;
      }),
    );
  }

  private transformToUppercase(obj: any) {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        obj[key] = obj[key].toUpperCase();
      } else if (typeof obj[key] === 'object') {
        this.transformToUppercase(obj[key]);
      }
    }
  }
}
