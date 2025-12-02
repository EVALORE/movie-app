import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const movieApiInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${environment.apiKey}`,
      accept: 'application/json',
    },
  });
  return next(clonedRequest);
};
