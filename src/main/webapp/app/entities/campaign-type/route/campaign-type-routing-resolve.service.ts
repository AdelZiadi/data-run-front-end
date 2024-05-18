import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICampaignType } from '../campaign-type.model';
import { CampaignTypeService } from '../service/campaign-type.service';

const campaignTypeResolve = (route: ActivatedRouteSnapshot): Observable<null | ICampaignType> => {
  const id = route.params['id'];
  if (id) {
    return inject(CampaignTypeService)
      .find(id)
      .pipe(
        mergeMap((campaignType: HttpResponse<ICampaignType>) => {
          if (campaignType.body) {
            return of(campaignType.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default campaignTypeResolve;
