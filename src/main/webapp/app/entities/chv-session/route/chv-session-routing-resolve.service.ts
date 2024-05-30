import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IChvSession } from '../chv-session.model';
import { ChvSessionService } from '../service/chv-session.service';

const chvSessionResolve = (route: ActivatedRouteSnapshot): Observable<null | IChvSession> => {
  const id = route.params['id'];
  if (id) {
    return inject(ChvSessionService)
      .find(id)
      .pipe(
        mergeMap((chvSession: HttpResponse<IChvSession>) => {
          if (chvSession.body) {
            return of(chvSession.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default chvSessionResolve;
