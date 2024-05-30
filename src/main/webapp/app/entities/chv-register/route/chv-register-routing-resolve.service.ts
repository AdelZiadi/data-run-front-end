import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IChvRegister } from '../chv-register.model';
import { ChvRegisterService } from '../service/chv-register.service';

const chvRegisterResolve = (route: ActivatedRouteSnapshot): Observable<null | IChvRegister> => {
  const id = route.params['id'];
  if (id) {
    return inject(ChvRegisterService)
      .find(id)
      .pipe(
        mergeMap((chvRegister: HttpResponse<IChvRegister>) => {
          if (chvRegister.body) {
            return of(chvRegister.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default chvRegisterResolve;
