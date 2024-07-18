import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { RefreshTokenComponent } from './list/refresh-token.component';
import { RefreshTokenDetailComponent } from './detail/refresh-token-detail.component';
import { RefreshTokenUpdateComponent } from './update/refresh-token-update.component';
import RefreshTokenResolve from './route/refresh-token-routing-resolve.service';

const refreshTokenRoute: Routes = [
  {
    path: '',
    component: RefreshTokenComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RefreshTokenDetailComponent,
    resolve: {
      refreshToken: RefreshTokenResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RefreshTokenUpdateComponent,
    resolve: {
      refreshToken: RefreshTokenResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RefreshTokenUpdateComponent,
    resolve: {
      refreshToken: RefreshTokenResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default refreshTokenRoute;
