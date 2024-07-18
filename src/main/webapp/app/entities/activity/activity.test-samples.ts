import dayjs from 'dayjs/esm';

import { IActivity, NewActivity } from './activity.model';

export const sampleWithRequiredData: IActivity = {
  id: 25351,
  startDate: dayjs('2024-05-22T14:35'),
};

export const sampleWithPartialData: IActivity = {
  id: 6779,
  startDate: dayjs('2024-05-22T00:43'),
  deleteClientData: true,
};

export const sampleWithFullData: IActivity = {
  id: 24505,
  uid: 'whoever coa',
  code: 'union supposing',
  name: 'methinks unimpressively cord',
  startDate: dayjs('2024-05-22T15:57'),
  endDate: dayjs('2024-05-22T06:52'),
  disabled: true,
  deleteClientData: false,
};

export const sampleWithNewData: NewActivity = {
  startDate: dayjs('2024-05-22T23:11'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
