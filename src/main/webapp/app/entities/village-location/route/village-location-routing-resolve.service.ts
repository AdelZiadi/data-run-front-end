import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IVillageLocation } from '../village-location.model';
import { VillageLocationService } from '../service/village-location.service';

const villageLocationResolve = (route: ActivatedRouteSnapshot): Observable<null | IVillageLocation> => {
  const id = route.params['id'];
  if (id) {
    return inject(VillageLocationService)
      .find(id)
      .pipe(
        mergeMap((villageLocation: HttpResponse<IVillageLocation>) => {
          if (villageLocation.body) {
            return of(villageLocation.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default villageLocationResolve;
