import dayjs from 'dayjs/esm';

import { IChvRegister, NewChvRegister } from './chv-register.model';

export const sampleWithRequiredData: IChvRegister = {
  id: 780,
  uid: 'criminal gr',
  name: 'slow',
  visitDate: dayjs('2024-05-29T11:45'),
  status: 'COMPLETED',
};

export const sampleWithPartialData: IChvRegister = {
  id: 1473,
  uid: 'mundane sea',
  name: 'explain pretest though',
  visitDate: dayjs('2024-05-29T10:54'),
  pregnant: true,
  testResult: 'PV',
  deleted: true,
  startEntryTime: dayjs('2024-05-28T21:04'),
  comment: 'whether',
  status: 'COMPLETED',
};

export const sampleWithFullData: IChvRegister = {
  id: 12064,
  uid: 'other virtu',
  code: 'topple brr',
  name: 'kendo but drat',
  locationName: 'extinguish interchange down',
  age: 5198,
  gender: 'MALE',
  visitDate: dayjs('2024-05-28T23:14'),
  pregnant: true,
  testResult: 'INVALID',
  detectionType: 'ACTIVE',
  severity: 'SIMPLE',
  treatment: 'TREATED',
  deleted: true,
  startEntryTime: dayjs('2024-05-29T01:30'),
  finishedEntryTime: dayjs('2024-05-29T09:35'),
  comment: 'yippee mmm supplement',
  status: 'ACTIVE',
};

export const sampleWithNewData: NewChvRegister = {
  uid: 'essence hef',
  name: 'incidentally',
  visitDate: dayjs('2024-05-29T06:50'),
  status: 'COMPLETED',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
