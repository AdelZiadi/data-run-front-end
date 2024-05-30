import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { ChvSessionComponent } from './list/chv-session.component';
import { ChvSessionDetailComponent } from './detail/chv-session-detail.component';
import { ChvSessionUpdateComponent } from './update/chv-session-update.component';
import ChvSessionResolve from './route/chv-session-routing-resolve.service';

const chvSessionRoute: Routes = [
  {
    path: '',
    component: ChvSessionComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ChvSessionDetailComponent,
    resolve: {
      chvSession: ChvSessionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ChvSessionUpdateComponent,
    resolve: {
      chvSession: ChvSessionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ChvSessionUpdateComponent,
    resolve: {
      chvSession: ChvSessionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default chvSessionRoute;
