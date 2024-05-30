import dayjs from 'dayjs/esm';

import { IProject, NewProject } from './project.model';

export const sampleWithRequiredData: IProject = {
  id: 29294,
};

export const sampleWithPartialData: IProject = {
  id: 17221,
  displayed: false,
  createdDate: dayjs('2024-05-22T13:34'),
  lastModifiedBy: 'verdict',
  lastModifiedDate: dayjs('2024-05-22T12:12'),
};

export const sampleWithFullData: IProject = {
  id: 13717,
  uid: 'sick psst',
  code: 'now oh',
  name: 'yum',
  displayed: false,
  createdBy: 'instead buttonhole whitewash',
  createdDate: dayjs('2024-05-22T03:59'),
  lastModifiedBy: 'comestible',
  lastModifiedDate: dayjs('2024-05-22T04:52'),
};

export const sampleWithNewData: NewProject = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
