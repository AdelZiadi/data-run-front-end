import { IProject, NewProject } from './project.model';

export const sampleWithRequiredData: IProject = {
  id: 28026,
};

export const sampleWithPartialData: IProject = {
  id: 1150,
  uid: 'belt',
  code: 'oh besides pfft',
};

export const sampleWithFullData: IProject = {
  id: 29331,
  uid: 'phew sketch',
  code: 'though',
  name: 'gah beside when',
  disabled: true,
};

export const sampleWithNewData: NewProject = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
