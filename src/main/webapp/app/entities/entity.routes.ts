import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'dataRunClientApp.adminAuthority.home.title' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'project',
    data: { pageTitle: 'dataRunClientApp.project.home.title' },
    loadChildren: () => import('./project/project.routes'),
  },
  {
    path: 'activity',
    data: { pageTitle: 'dataRunClientApp.activity.home.title' },
    loadChildren: () => import('./activity/activity.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
