import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { PatientInfoComponent } from './list/patient-info.component';
import { PatientInfoDetailComponent } from './detail/patient-info-detail.component';
import { PatientInfoUpdateComponent } from './update/patient-info-update.component';
import PatientInfoResolve from './route/patient-info-routing-resolve.service';

const patientInfoRoute: Routes = [
  {
    path: '',
    component: PatientInfoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PatientInfoDetailComponent,
    resolve: {
      patientInfo: PatientInfoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PatientInfoUpdateComponent,
    resolve: {
      patientInfo: PatientInfoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PatientInfoUpdateComponent,
    resolve: {
      patientInfo: PatientInfoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default patientInfoRoute;
