import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IReviewTeam } from '../review-team.model';
import { ReviewTeamService } from '../service/review-team.service';

const reviewTeamResolve = (route: ActivatedRouteSnapshot): Observable<null | IReviewTeam> => {
  const id = route.params['id'];
  if (id) {
    return inject(ReviewTeamService)
      .find(id)
      .pipe(
        mergeMap((reviewTeam: HttpResponse<IReviewTeam>) => {
          if (reviewTeam.body) {
            return of(reviewTeam.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default reviewTeamResolve;
