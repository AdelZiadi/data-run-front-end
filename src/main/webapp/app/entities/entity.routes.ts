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
  {
    path: 'village-location',
    data: { pageTitle: 'dataRunClientApp.villageLocation.home.title' },
    loadChildren: () => import('./village-location/village-location.routes'),
  },
  {
    path: 'assignment',
    data: { pageTitle: 'dataRunClientApp.assignment.home.title' },
    loadChildren: () => import('./assignment/assignment.routes'),
  },
  {
    path: 'progress-status',
    data: { pageTitle: 'dataRunClientApp.progressStatus.home.title' },
    loadChildren: () => import('./progress-status/progress-status.routes'),
  },
  {
    path: 'review-team',
    data: { pageTitle: 'dataRunClientApp.reviewTeam.home.title' },
    loadChildren: () => import('./review-team/review-team.routes'),
  },
  {
    path: 'team',
    data: { pageTitle: 'dataRunClientApp.team.home.title' },
    loadChildren: () => import('./team/team.routes'),
  },
  {
    path: 'warehouse',
    data: { pageTitle: 'dataRunClientApp.warehouse.home.title' },
    loadChildren: () => import('./warehouse/warehouse.routes'),
  },
  {
    path: 'warehouse-item',
    data: { pageTitle: 'dataRunClientApp.warehouseItem.home.title' },
    loadChildren: () => import('./warehouse-item/warehouse-item.routes'),
  },
  {
    path: 'chv-register',
    data: { pageTitle: 'dataRunClientApp.chvRegister.home.title' },
    loadChildren: () => import('./chv-register/chv-register.routes'),
  },
  {
    path: 'patient-info',
    data: { pageTitle: 'dataRunClientApp.patientInfo.home.title' },
    loadChildren: () => import('./patient-info/patient-info.routes'),
  },
  {
    path: 'chv-session',
    data: { pageTitle: 'dataRunClientApp.chvSession.home.title' },
    loadChildren: () => import('./chv-session/chv-session.routes'),
  },
  {
    path: 'itns-village',
    data: { pageTitle: 'dataRunClientApp.itnsVillage.home.title' },
    loadChildren: () => import('./itns-village/itns-village.routes'),
  },
  {
    path: 'itns-village-houses-detail',
    data: { pageTitle: 'dataRunClientApp.itnsVillageHousesDetail.home.title' },
    loadChildren: () => import('./itns-village-houses-detail/itns-village-houses-detail.routes'),
  },
  {
    path: 'warehouse-transaction',
    data: { pageTitle: 'dataRunClientApp.warehouseTransaction.home.title' },
    loadChildren: () => import('./warehouse-transaction/warehouse-transaction.routes'),
  },
  {
    path: 'refresh-token',
    data: { pageTitle: 'dataRunClientApp.refreshToken.home.title' },
    loadChildren: () => import('./refresh-token/refresh-token.routes'),
  },
  {
    path: 'team-form-access',
    data: { pageTitle: 'dataRunClientApp.teamFormAccess.home.title' },
    loadChildren: () => import('./team-form-access/team-form-access.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
