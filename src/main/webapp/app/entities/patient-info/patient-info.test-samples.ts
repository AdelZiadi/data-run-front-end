import dayjs from 'dayjs/esm';

import { IPatientInfo, NewPatientInfo } from './patient-info.model';

export const sampleWithRequiredData: IPatientInfo = {
  id: 4194,
};

export const sampleWithPartialData: IPatientInfo = {
  id: 5780,
  uid: 'below',
  age: 19,
  createdBy: 'quiet ick',
  lastModifiedBy: 'lard oddly',
  lastModifiedDate: dayjs('2024-05-29T01:37'),
};

export const sampleWithFullData: IPatientInfo = {
  id: 23127,
  uid: 'variety wor',
  code: 'honestly and',
  name: 'mechanize over disembodiment',
  age: 77,
  gender: 'MALE',
  createdBy: 'underrate down if',
  createdDate: dayjs('2024-05-29T08:04'),
  lastModifiedBy: 'last an',
  lastModifiedDate: dayjs('2024-05-29T00:36'),
};

export const sampleWithNewData: NewPatientInfo = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
