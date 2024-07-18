import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { WarehouseTransactionComponent } from './list/warehouse-transaction.component';
import { WarehouseTransactionDetailComponent } from './detail/warehouse-transaction-detail.component';
import { WarehouseTransactionUpdateComponent } from './update/warehouse-transaction-update.component';
import WarehouseTransactionResolve from './route/warehouse-transaction-routing-resolve.service';

const warehouseTransactionRoute: Routes = [
  {
    path: '',
    component: WarehouseTransactionComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: WarehouseTransactionDetailComponent,
    resolve: {
      warehouseTransaction: WarehouseTransactionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: WarehouseTransactionUpdateComponent,
    resolve: {
      warehouseTransaction: WarehouseTransactionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: WarehouseTransactionUpdateComponent,
    resolve: {
      warehouseTransaction: WarehouseTransactionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default warehouseTransactionRoute;
