import dayjs from 'dayjs/esm';

import { IReviewTeam, NewReviewTeam } from './review-team.model';

export const sampleWithRequiredData: IReviewTeam = {
  id: 29524,
};

export const sampleWithPartialData: IReviewTeam = {
  id: 7666,
  code: 'phew now',
};

export const sampleWithFullData: IReviewTeam = {
  id: 15049,
  uid: 'poignance',
  code: 'sans excitedly',
  name: 'uh-huh ha restfully',
  user: 'supposing eve trend',
  createdBy: 'crossly',
  createdDate: dayjs('2024-05-22T07:55'),
  lastModifiedBy: 'leptocephalus though',
  lastModifiedDate: dayjs('2024-05-22T01:18'),
};

export const sampleWithNewData: NewReviewTeam = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
