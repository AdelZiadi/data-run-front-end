import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITeamFormAccess } from '../team-form-access.model';
import { TeamFormAccessService } from '../service/team-form-access.service';

const teamFormAccessResolve = (route: ActivatedRouteSnapshot): Observable<null | ITeamFormAccess> => {
  const id = route.params['id'];
  if (id) {
    return inject(TeamFormAccessService)
      .find(id)
      .pipe(
        mergeMap((teamFormAccess: HttpResponse<ITeamFormAccess>) => {
          if (teamFormAccess.body) {
            return of(teamFormAccess.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default teamFormAccessResolve;
