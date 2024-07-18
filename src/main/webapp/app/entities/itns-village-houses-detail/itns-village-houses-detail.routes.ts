import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { ItnsVillageHousesDetailComponent } from './list/itns-village-houses-detail.component';
import { ItnsVillageHousesDetailDetailComponent } from './detail/itns-village-houses-detail-detail.component';
import { ItnsVillageHousesDetailUpdateComponent } from './update/itns-village-houses-detail-update.component';
import ItnsVillageHousesDetailResolve from './route/itns-village-houses-detail-routing-resolve.service';

const itnsVillageHousesDetailRoute: Routes = [
  {
    path: '',
    component: ItnsVillageHousesDetailComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ItnsVillageHousesDetailDetailComponent,
    resolve: {
      itnsVillageHousesDetail: ItnsVillageHousesDetailResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ItnsVillageHousesDetailUpdateComponent,
    resolve: {
      itnsVillageHousesDetail: ItnsVillageHousesDetailResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ItnsVillageHousesDetailUpdateComponent,
    resolve: {
      itnsVillageHousesDetail: ItnsVillageHousesDetailResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default itnsVillageHousesDetailRoute;
