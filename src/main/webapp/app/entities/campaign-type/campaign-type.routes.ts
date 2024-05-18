import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { CampaignTypeComponent } from './list/campaign-type.component';
import { CampaignTypeDetailComponent } from './detail/campaign-type-detail.component';
import { CampaignTypeUpdateComponent } from './update/campaign-type-update.component';
import CampaignTypeResolve from './route/campaign-type-routing-resolve.service';

const campaignTypeRoute: Routes = [
  {
    path: '',
    component: CampaignTypeComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CampaignTypeDetailComponent,
    resolve: {
      campaignType: CampaignTypeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CampaignTypeUpdateComponent,
    resolve: {
      campaignType: CampaignTypeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CampaignTypeUpdateComponent,
    resolve: {
      campaignType: CampaignTypeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default campaignTypeRoute;
