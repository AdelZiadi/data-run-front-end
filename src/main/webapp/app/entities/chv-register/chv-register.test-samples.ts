import dayjs from 'dayjs/esm';

import { IChvRegister, NewChvRegister } from './chv-register.model';

export const sampleWithRequiredData: IChvRegister = {
  id: 22093,
  visitDate: dayjs('2024-05-29T15:43'),
};

export const sampleWithPartialData: IChvRegister = {
  id: 9714,
  uid: 'creolize fr',
  code: 'drafty',
  name: 'trout',
  visitDate: dayjs('2024-05-28T16:49'),
  pregnant: false,
  detectionType: 'REACTIVE',
  comment: 'when',
  deleted: true,
  createdBy: 'truncate foam fat',
  lastModifiedBy: 'at accentuate till',
};

export const sampleWithFullData: IChvRegister = {
  id: 11878,
  uid: 'creditor pa',
  code: 'gosh yum',
  name: 'export',
  visitDate: dayjs('2024-05-29T10:11'),
  pregnant: true,
  testResult: 'PV',
  detectionType: 'ACTIVE',
  severity: 'SIMPLE',
  treatment: 'TREATED',
  comment: 'yuck',
  startEntryTime: dayjs('2024-05-29T02:44'),
  deleted: false,
  createdBy: 'steamroller successfully standpoint',
  createdDate: dayjs('2024-05-28T18:19'),
  lastModifiedBy: 'who from',
  lastModifiedDate: dayjs('2024-05-28T17:16'),
};

export const sampleWithNewData: NewChvRegister = {
  visitDate: dayjs('2024-05-28T19:34'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
