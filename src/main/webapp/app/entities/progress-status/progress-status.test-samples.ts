import { IProgressStatus, NewProgressStatus } from './progress-status.model';

export const sampleWithRequiredData: IProgressStatus = {
  id: 24790,
  uid: 'bravely cow',
};

export const sampleWithPartialData: IProgressStatus = {
  id: 8427,
  uid: 'carelessly ',
};

export const sampleWithFullData: IProgressStatus = {
  id: 11851,
  uid: 'strafe real',
  code: 'witty annually',
  name: 'yet worrisome availability',
};

export const sampleWithNewData: NewProgressStatus = {
  uid: 'whoever sil',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
