import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError} from 'rxjs';
import { Authservice } from '../auth/authservice';
import { ApiEndpoints } from '../../../api-endpoints';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {


  const authService = inject(Authservice);
  const router = inject(Router);

  const token = authService.getAccessToken();

  const clonedRequest = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}`,},}): req;

  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      const isRefreshRequest = req.url === ApiEndpoints.Auth.RefreshToken;

      const isLoginRequest = req.url === ApiEndpoints.Auth.DevLogin || req.url === ApiEndpoints.Auth.Login;

      if ( error.status !== 401 || isRefreshRequest || isLoginRequest) {
        return throwError(() => error);
      }

      return authService.refreshToken().pipe(
        switchMap((response) => {
          if (!response.success || !response.data) {
            authService.clearAccessToken();
            router.navigate(['/login']);

            return throwError(() => error);
          }

          const newAccessToken = response.data.accessToken;
          authService.setAccessToken(newAccessToken);

          const retryRequest = req.clone({ setHeaders: { Authorization: `Bearer ${newAccessToken}`}});
          return next(retryRequest);
        }),

        catchError((refreshError) => {
          authService.clearAccessToken();
          router.navigate(['/login']);
          return throwError(() => refreshError);
        })
      );
    })
  );
};