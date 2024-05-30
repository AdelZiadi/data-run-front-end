import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { ReviewTeamComponent } from './list/review-team.component';
import { ReviewTeamDetailComponent } from './detail/review-team-detail.component';
import { ReviewTeamUpdateComponent } from './update/review-team-update.component';
import ReviewTeamResolve from './route/review-team-routing-resolve.service';

const reviewTeamRoute: Routes = [
  {
    path: '',
    component: ReviewTeamComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ReviewTeamDetailComponent,
    resolve: {
      reviewTeam: ReviewTeamResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ReviewTeamUpdateComponent,
    resolve: {
      reviewTeam: ReviewTeamResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ReviewTeamUpdateComponent,
    resolve: {
      reviewTeam: ReviewTeamResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default reviewTeamRoute;
