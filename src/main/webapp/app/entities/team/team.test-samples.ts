import dayjs from 'dayjs/esm';

import { ITeam, NewTeam } from './team.model';

export const sampleWithRequiredData: ITeam = {
  id: 12009,
  code: 'too forenenst astride',
};

export const sampleWithPartialData: ITeam = {
  id: 3522,
  code: 'robust although',
  description: 'prey via',
  mobility: 'into dearly leek',
  createdBy: 'generously although',
  createdDate: dayjs('2024-05-22T05:44'),
  lastModifiedBy: 'doe fooey',
  lastModifiedDate: dayjs('2024-05-22T18:08'),
};

export const sampleWithFullData: ITeam = {
  id: 21771,
  uid: 'yowza searc',
  code: 'seriously inspiration barring',
  name: 'ack estate',
  description: 'quaintly mushy concerned',
  mobile: 'hourly among',
  workers: 24613,
  mobility: 'silver clerk playful',
  createdBy: 'at yet',
  createdDate: dayjs('2024-05-22T18:44'),
  lastModifiedBy: 'celebrated amid moral',
  lastModifiedDate: dayjs('2024-05-22T23:05'),
};

export const sampleWithNewData: NewTeam = {
  code: 'escalate',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
