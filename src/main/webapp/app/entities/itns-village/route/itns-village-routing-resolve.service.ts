import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IItnsVillage } from '../itns-village.model';
import { ItnsVillageService } from '../service/itns-village.service';

const itnsVillageResolve = (route: ActivatedRouteSnapshot): Observable<null | IItnsVillage> => {
  const id = route.params['id'];
  if (id) {
    return inject(ItnsVillageService)
      .find(id)
      .pipe(
        mergeMap((itnsVillage: HttpResponse<IItnsVillage>) => {
          if (itnsVillage.body) {
            return of(itnsVillage.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default itnsVillageResolve;
