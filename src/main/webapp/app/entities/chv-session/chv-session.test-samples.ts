import dayjs from 'dayjs/esm';

import { IChvSession, NewChvSession } from './chv-session.model';

export const sampleWithRequiredData: IChvSession = {
  id: 21602,
  uid: 'buttery',
  sessionDate: dayjs('2024-05-29T12:38'),
  sessions: 12138,
  people: 28196,
  status: 'ACTIVE',
};

export const sampleWithPartialData: IChvSession = {
  id: 18925,
  uid: 'soundproof ',
  sessionDate: dayjs('2024-05-29T22:26'),
  subject: 'BreadingSite',
  sessions: 18745,
  people: 19673,
  comment: 'twist monster',
  deleted: true,
  finishedEntryTime: dayjs('2024-05-30T07:08'),
  status: 'COMPLETED',
};

export const sampleWithFullData: IChvSession = {
  id: 11776,
  uid: 'treasure',
  code: 'loads',
  name: 'till pray er',
  sessionDate: dayjs('2024-05-30T04:13'),
  subject: 'BreadingSite',
  sessions: 12039,
  people: 11057,
  comment: 'paint fair',
  deleted: true,
  startEntryTime: dayjs('2024-05-29T17:12'),
  finishedEntryTime: dayjs('2024-05-30T00:25'),
  status: 'ACTIVE',
};

export const sampleWithNewData: NewChvSession = {
  uid: 'needy',
  sessionDate: dayjs('2024-05-30T06:12'),
  sessions: 17619,
  people: 26523,
  status: 'ACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
