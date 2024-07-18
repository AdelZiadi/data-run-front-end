import dayjs from 'dayjs/esm';

import { ITeamFormAccess, NewTeamFormAccess } from './team-form-access.model';

export const sampleWithRequiredData: ITeamFormAccess = {
  id: 18613,
  uid: 'ah discern ',
  sessionDate: dayjs('2024-07-03T18:56'),
  sessions: 32141,
  people: 31435,
};

export const sampleWithPartialData: ITeamFormAccess = {
  id: 27362,
  uid: 'gold or cru',
  name: 'till truly',
  sessionDate: dayjs('2024-07-02T22:02'),
  sessions: 7625,
  people: 12226,
  comment: 'camouflage unlawful consequently',
  deleted: true,
  startEntryTime: dayjs('2024-07-03T08:07'),
  status: 'COMPLETED',
};

export const sampleWithFullData: ITeamFormAccess = {
  id: 14350,
  uid: 'by',
  code: 'pfft acidify accustom',
  name: 'enormously boxspring incomplete',
  sessionDate: dayjs('2024-07-03T14:16'),
  subject: 'TRANSMISSION_PREVENTION',
  sessions: 30237,
  people: 3704,
  comment: 'rapidly',
  deleted: true,
  startEntryTime: dayjs('2024-07-03T01:28'),
  finishedEntryTime: dayjs('2024-07-03T18:13'),
  status: 'COMPLETED',
};

export const sampleWithNewData: NewTeamFormAccess = {
  uid: 'off',
  sessionDate: dayjs('2024-07-03T07:41'),
  sessions: 5964,
  people: 28792,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
