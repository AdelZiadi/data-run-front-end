import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IProgressStatus } from '../progress-status.model';
import { ProgressStatusService } from '../service/progress-status.service';

const progressStatusResolve = (route: ActivatedRouteSnapshot): Observable<null | IProgressStatus> => {
  const id = route.params['id'];
  if (id) {
    return inject(ProgressStatusService)
      .find(id)
      .pipe(
        mergeMap((progressStatus: HttpResponse<IProgressStatus>) => {
          if (progressStatus.body) {
            return of(progressStatus.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default progressStatusResolve;
