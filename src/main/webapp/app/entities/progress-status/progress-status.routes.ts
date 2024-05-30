import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { ProgressStatusComponent } from './list/progress-status.component';
import { ProgressStatusDetailComponent } from './detail/progress-status-detail.component';
import { ProgressStatusUpdateComponent } from './update/progress-status-update.component';
import ProgressStatusResolve from './route/progress-status-routing-resolve.service';

const progressStatusRoute: Routes = [
  {
    path: '',
    component: ProgressStatusComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProgressStatusDetailComponent,
    resolve: {
      progressStatus: ProgressStatusResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProgressStatusUpdateComponent,
    resolve: {
      progressStatus: ProgressStatusResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProgressStatusUpdateComponent,
    resolve: {
      progressStatus: ProgressStatusResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default progressStatusRoute;
