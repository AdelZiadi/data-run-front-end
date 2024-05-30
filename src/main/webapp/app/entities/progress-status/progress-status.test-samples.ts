import dayjs from 'dayjs/esm';

import { IProgressStatus, NewProgressStatus } from './progress-status.model';

export const sampleWithRequiredData: IProgressStatus = {
  id: 24094,
};

export const sampleWithPartialData: IProgressStatus = {
  id: 17715,
  code: 'owlishly irritably worth',
  createdDate: dayjs('2024-05-22T10:45'),
  lastModifiedDate: dayjs('2024-05-22T02:32'),
};

export const sampleWithFullData: IProgressStatus = {
  id: 23075,
  uid: 'ghost over ',
  code: 'tournament',
  name: 'pluralise recording inspector',
  createdBy: 'yearly',
  createdDate: dayjs('2024-05-22T00:24'),
  lastModifiedBy: 'quietly',
  lastModifiedDate: dayjs('2024-05-22T10:48'),
};

export const sampleWithNewData: NewProgressStatus = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
