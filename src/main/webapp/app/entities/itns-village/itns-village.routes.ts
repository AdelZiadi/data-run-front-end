import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { ItnsVillageComponent } from './list/itns-village.component';
import { ItnsVillageDetailComponent } from './detail/itns-village-detail.component';
import { ItnsVillageUpdateComponent } from './update/itns-village-update.component';
import ItnsVillageResolve from './route/itns-village-routing-resolve.service';

const itnsVillageRoute: Routes = [
  {
    path: '',
    component: ItnsVillageComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ItnsVillageDetailComponent,
    resolve: {
      itnsVillage: ItnsVillageResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ItnsVillageUpdateComponent,
    resolve: {
      itnsVillage: ItnsVillageResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ItnsVillageUpdateComponent,
    resolve: {
      itnsVillage: ItnsVillageResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default itnsVillageRoute;
