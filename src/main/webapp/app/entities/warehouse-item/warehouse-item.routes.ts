import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { WarehouseItemComponent } from './list/warehouse-item.component';
import { WarehouseItemDetailComponent } from './detail/warehouse-item-detail.component';
import { WarehouseItemUpdateComponent } from './update/warehouse-item-update.component';
import WarehouseItemResolve from './route/warehouse-item-routing-resolve.service';

const warehouseItemRoute: Routes = [
  {
    path: '',
    component: WarehouseItemComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: WarehouseItemDetailComponent,
    resolve: {
      warehouseItem: WarehouseItemResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: WarehouseItemUpdateComponent,
    resolve: {
      warehouseItem: WarehouseItemResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: WarehouseItemUpdateComponent,
    resolve: {
      warehouseItem: WarehouseItemResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default warehouseItemRoute;
