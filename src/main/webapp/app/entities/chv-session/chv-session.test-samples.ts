import dayjs from 'dayjs/esm';

import { IChvSession, NewChvSession } from './chv-session.model';

export const sampleWithRequiredData: IChvSession = {
  id: 24554,
  sessionDate: dayjs('2024-05-29T17:35'),
  sessions: 32242,
  people: 1625,
};

export const sampleWithPartialData: IChvSession = {
  id: 26253,
  uid: 'eternity re',
  name: 'unhealthy boo till',
  sessionDate: dayjs('2024-05-30T11:52'),
  sessions: 945,
  people: 5571,
  comment: 'knowledgeably misplace zowie',
  deleted: true,
  createdBy: 'oh',
  createdDate: dayjs('2024-05-29T22:41'),
};

export const sampleWithFullData: IChvSession = {
  id: 13552,
  uid: 'scrutinise ',
  code: 'rapidly failing scarily',
  name: 'surge intensely',
  sessionDate: dayjs('2024-05-29T13:53'),
  subject: 'BreadingSite',
  sessions: 23889,
  people: 3989,
  comment: 'in unlawful',
  startEntryTime: dayjs('2024-05-29T21:00'),
  deleted: true,
  createdBy: 'productive private',
  createdDate: dayjs('2024-05-29T19:18'),
  lastModifiedBy: 'though',
  lastModifiedDate: dayjs('2024-05-29T23:31'),
};

export const sampleWithNewData: NewChvSession = {
  sessionDate: dayjs('2024-05-30T10:51'),
  sessions: 9181,
  people: 32505,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
