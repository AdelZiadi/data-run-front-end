import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { TeamFormAccessComponent } from './list/team-form-access.component';
import { TeamFormAccessDetailComponent } from './detail/team-form-access-detail.component';
import { TeamFormAccessUpdateComponent } from './update/team-form-access-update.component';
import TeamFormAccessResolve from './route/team-form-access-routing-resolve.service';

const teamFormAccessRoute: Routes = [
  {
    path: '',
    component: TeamFormAccessComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TeamFormAccessDetailComponent,
    resolve: {
      teamFormAccess: TeamFormAccessResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TeamFormAccessUpdateComponent,
    resolve: {
      teamFormAccess: TeamFormAccessResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TeamFormAccessUpdateComponent,
    resolve: {
      teamFormAccess: TeamFormAccessResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default teamFormAccessRoute;
