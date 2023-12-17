import {
    NestInterceptor,
    ExecutionContext,
    Injectable,
    NotFoundException,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { catchError } from 'rxjs/operators';
  
  export class EntityNotFoundError extends Error {}
  
  @Injectable()
  export class NotFoundInterceptor implements NestInterceptor {
    intercept(
      context: ExecutionContext,
      next: CallHandler<any>,
    ): Observable<any> {
      return next.handle().pipe(
        catchError(error => {
          if (error instanceof EntityNotFoundError) {
            throw new NotFoundException(error.message);
          } else {
            throw error;
          }
        }),
      );
    }
  }
  