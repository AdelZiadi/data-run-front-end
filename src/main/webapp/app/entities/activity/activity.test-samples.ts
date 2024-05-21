import dayjs from 'dayjs/esm';

import { IActivity, NewActivity } from './activity.model';

export const sampleWithRequiredData: IActivity = {
  id: 16245,
  startDate: dayjs('2024-05-20T19:53'),
};

export const sampleWithPartialData: IActivity = {
  id: 22907,
  uid: 'cheap',
  name: 'gentle ha',
  startDate: dayjs('2024-05-20T23:11'),
  endDate: dayjs('2024-05-21T10:07'),
  active: true,
};

export const sampleWithFullData: IActivity = {
  id: 9421,
  uid: 'although ee',
  code: 'whereas',
  name: 'and publicity',
  startDate: dayjs('2024-05-21T03:42'),
  endDate: dayjs('2024-05-21T04:31'),
  active: false,
  displayed: false,
  order: 9130,
};

export const sampleWithNewData: NewActivity = {
  startDate: dayjs('2024-05-20T20:37'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
