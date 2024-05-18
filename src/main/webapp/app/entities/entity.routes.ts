import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'dataRunClientApp.adminAuthority.home.title' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'campaign',
    data: { pageTitle: 'dataRunClientApp.campaign.home.title' },
    loadChildren: () => import('./campaign/campaign.routes'),
  },
  {
    path: 'campaign-type',
    data: { pageTitle: 'dataRunClientApp.campaignType.home.title' },
    loadChildren: () => import('./campaign-type/campaign-type.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
