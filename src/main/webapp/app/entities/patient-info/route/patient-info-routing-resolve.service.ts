import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPatientInfo } from '../patient-info.model';
import { PatientInfoService } from '../service/patient-info.service';

const patientInfoResolve = (route: ActivatedRouteSnapshot): Observable<null | IPatientInfo> => {
  const id = route.params['id'];
  if (id) {
    return inject(PatientInfoService)
      .find(id)
      .pipe(
        mergeMap((patientInfo: HttpResponse<IPatientInfo>) => {
          if (patientInfo.body) {
            return of(patientInfo.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default patientInfoResolve;
