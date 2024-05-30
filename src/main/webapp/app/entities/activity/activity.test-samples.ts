import dayjs from 'dayjs/esm';

import { IActivity, NewActivity } from './activity.model';

export const sampleWithRequiredData: IActivity = {
  id: 16245,
  startDate: dayjs('2024-05-22T05:42'),
};

export const sampleWithPartialData: IActivity = {
  id: 13991,
  uid: 'intently',
  name: 'hm huzzah distant',
  startDate: dayjs('2024-05-22T10:51'),
  endDate: dayjs('2024-05-22T22:27'),
  active: true,
  lastModifiedDate: dayjs('2024-05-22T17:30'),
};

export const sampleWithFullData: IActivity = {
  id: 14515,
  uid: 'reluctantly',
  code: 'below judgementally yum',
  name: 'guide',
  startDate: dayjs('2024-05-22T02:24'),
  endDate: dayjs('2024-05-22T00:50'),
  active: false,
  createdBy: 'hmph',
  createdDate: dayjs('2024-05-22T20:23'),
  lastModifiedBy: 'tour constrict er',
  lastModifiedDate: dayjs('2024-05-22T13:39'),
};

export const sampleWithNewData: NewActivity = {
  startDate: dayjs('2024-05-22T17:07'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
