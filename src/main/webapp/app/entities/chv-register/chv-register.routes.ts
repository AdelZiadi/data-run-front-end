import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { ChvRegisterComponent } from './list/chv-register.component';
import { ChvRegisterDetailComponent } from './detail/chv-register-detail.component';
import { ChvRegisterUpdateComponent } from './update/chv-register-update.component';
import ChvRegisterResolve from './route/chv-register-routing-resolve.service';

const chvRegisterRoute: Routes = [
  {
    path: '',
    component: ChvRegisterComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ChvRegisterDetailComponent,
    resolve: {
      chvRegister: ChvRegisterResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ChvRegisterUpdateComponent,
    resolve: {
      chvRegister: ChvRegisterResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ChvRegisterUpdateComponent,
    resolve: {
      chvRegister: ChvRegisterResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default chvRegisterRoute;
