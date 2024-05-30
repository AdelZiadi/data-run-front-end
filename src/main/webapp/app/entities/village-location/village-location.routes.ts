import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { VillageLocationComponent } from './list/village-location.component';
import { VillageLocationDetailComponent } from './detail/village-location-detail.component';
import { VillageLocationUpdateComponent } from './update/village-location-update.component';
import VillageLocationResolve from './route/village-location-routing-resolve.service';

const villageLocationRoute: Routes = [
  {
    path: '',
    component: VillageLocationComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: VillageLocationDetailComponent,
    resolve: {
      villageLocation: VillageLocationResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: VillageLocationUpdateComponent,
    resolve: {
      villageLocation: VillageLocationResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: VillageLocationUpdateComponent,
    resolve: {
      villageLocation: VillageLocationResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default villageLocationRoute;
