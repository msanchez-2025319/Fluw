import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (req.url.includes('/auth/login') || req.url.includes('/auth/refresh')) {
    return next(req);
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return authService.refresh().pipe(
          switchMap(() => next(req)),
          catchError(() => {
            router.navigateByUrl('/session-expired');
            return throwError(() => error);
          })
        );
      }
      return throwError(() => error);
    })
  );
};