import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IItnsVillageHousesDetail } from '../itns-village-houses-detail.model';
import { ItnsVillageHousesDetailService } from '../service/itns-village-houses-detail.service';

const itnsVillageHousesDetailResolve = (route: ActivatedRouteSnapshot): Observable<null | IItnsVillageHousesDetail> => {
  const id = route.params['id'];
  if (id) {
    return inject(ItnsVillageHousesDetailService)
      .find(id)
      .pipe(
        mergeMap((itnsVillageHousesDetail: HttpResponse<IItnsVillageHousesDetail>) => {
          if (itnsVillageHousesDetail.body) {
            return of(itnsVillageHousesDetail.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default itnsVillageHousesDetailResolve;
