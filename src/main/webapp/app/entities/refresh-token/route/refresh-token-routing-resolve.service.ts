import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRefreshToken } from '../refresh-token.model';
import { RefreshTokenService } from '../service/refresh-token.service';

const refreshTokenResolve = (route: ActivatedRouteSnapshot): Observable<null | IRefreshToken> => {
  const id = route.params['id'];
  if (id) {
    return inject(RefreshTokenService)
      .find(id)
      .pipe(
        mergeMap((refreshToken: HttpResponse<IRefreshToken>) => {
          if (refreshToken.body) {
            return of(refreshToken.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default refreshTokenResolve;
