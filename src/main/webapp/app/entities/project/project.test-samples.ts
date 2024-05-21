import dayjs from 'dayjs/esm';

import { IProject, NewProject } from './project.model';

export const sampleWithRequiredData: IProject = {
  id: 29294,
};

export const sampleWithPartialData: IProject = {
  id: 8969,
  created: dayjs('2024-05-21T01:23'),
  displayed: false,
  order: 13976,
};

export const sampleWithFullData: IProject = {
  id: 3584,
  uid: 'meh',
  code: 'of if',
  name: 'vaguely lest',
  created: dayjs('2024-05-21T13:24'),
  lastUpdated: dayjs('2024-05-21T06:35'),
  displayed: true,
  order: 10558,
};

export const sampleWithNewData: NewProject = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
